import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { activities, standards, tools, activityFor, activitiesForTool } from '../src/lib/activities.mjs';
import { lessons } from '../src/lib/lessons.mjs';
import { explorations } from '../src/lib/explorations.mjs';
import { SHAPES, COMPOSITE_PARTS } from '../src/lib/math.mjs';

const source = file => readFileSync(new URL(`../src/components/${file}`, import.meta.url), 'utf8');

test('Every activity is a complete one-page worksheet tied to a real lesson and tool', () => {
  assert.ok(activities.length >= 12);
  assert.equal(new Set(activities.map(a => a.lesson)).size, activities.length);
  for (const a of activities) {
    assert.ok(lessons.some(l => l.slug === a.lesson), `${a.lesson}: unknown lesson`);
    for (const slug of a.also || []) assert.ok(lessons.some(l => l.slug === slug), `${a.lesson}: unknown lesson ${slug}`);
    assert.ok(tools[a.tool], `${a.lesson}: unknown tool ${a.tool}`);
    assert.ok(a.minutes >= 15 && a.minutes <= 30, a.lesson);
    assert.match(a.grade, /^Grades \d+–\d+$/);
    assert.ok(a.goal.length > 40, a.lesson);
    assert.ok(a.steps.length >= 3 && a.steps.length <= 5, a.lesson);
    assert.ok(a.questions.length >= 5 && a.questions.length <= 7, a.lesson);
    for (const q of a.questions) { assert.ok(q.q.length > 20 && q.a.length > 20, a.lesson); assert.ok(q.lines >= 2 && q.lines <= 4, a.lesson); }
  }
});

test('Lookups find the activity for a lesson and the activities for a tool', () => {
  assert.equal(activityFor('law-of-sines').lesson, 'law-of-cosines');
  assert.equal(activityFor('slope-and-lines'), undefined);
  assert.deepEqual(activitiesForTool('transformations').map(a => a.lesson).sort(), ['similarity-and-scale', 'transformations']);
});

test('Standards are only real codes from the documented list', () => {
  for (const a of activities) for (const code of a.standards) assert.ok(code in standards, `${a.lesson}: ${code}`);
});

test('Exploration tools point at real tool pages', () => {
  for (const [key, tool] of Object.entries(tools)) {
    if (tool.exploration) { assert.ok(explorations.some(t => t.slug === tool.exploration), key); assert.equal(tool.href, `/tools/${tool.exploration}/`); }
    else assert.ok(source(tool.component).length > 0, key);
  }
});

// Every “quoted” control in a worksheet step must exist in the tool students are sent to.
test('Worksheet steps only name controls the tool actually has', () => {
  for (const a of activities) {
    const tool = tools[a.tool];
    const text = [tool.component, tool.extra].filter(Boolean).map(source).join('\n') + (tool.exploration ? source('Exploration.astro') : '');
    const exploration = explorations.find(t => t.slug === tool.exploration);
    const names = new Set([...(exploration?.fields.map(f => f.label) || []), ...(exploration?.modes?.map(m => m[1]) || []), ...Object.values(SHAPES).flatMap(s => [s.title, ...s.fields]), ...Object.values(COMPOSITE_PARTS).flatMap(p => [p.title, ...p.fields])]);
    for (const step of a.steps) for (const [, name] of step.matchAll(/“([^”]+)”/g)) {
      const preset = name.match(/^(\d+)(°| sides)$/);
      const ok = names.has(name) || text.includes(name) || (preset && text.includes('data-preset') && new RegExp(`\\b${preset[1]}\\b`).test(text));
      assert.ok(ok, `${a.lesson}: step names “${name}”, which the tool does not have`);
    }
  }
});

test('Every results-table cell has an answer computed from the site’s math', () => {
  for (const a of activities) for (const [label, values] of a.table.rows) for (const col of a.table.record) {
    assert.equal(typeof values[col], 'string', `${a.lesson} ${label}: ${col}`);
    assert.ok(values[col].length > 0 && !/NaN|undefined|Infinity/.test(values[col]) || values[col] === 'undefined', `${a.lesson} ${label}: ${col} = ${values[col]}`);
  }
});

// Every number printed in an answer key must match the model it came from, to the precision shown.
test('Answer-key numbers match the math within rounding', () => {
  let count = 0;
  for (const a of activities) for (const q of a.questions) for (const [shown, value] of q.checks || []) {
    assert.ok(q.a.includes(shown), `${a.lesson}: "${shown}" missing from answer`);
    const plain = shown.replace(/,/g, '').replace(/−/g, '-');
    const decimals = (plain.split('.')[1] || '').length, printed = Number(plain);
    assert.ok(Number.isFinite(printed) && Number.isFinite(value), `${a.lesson}: ${shown}`);
    assert.ok(Math.abs(printed - value) <= 0.5 * 10 ** -decimals + 1e-9, `${a.lesson}: printed ${shown} but the math gives ${value}`);
    count++;
  }
  assert.ok(count >= 80, `only ${count} checked numbers`);
});
