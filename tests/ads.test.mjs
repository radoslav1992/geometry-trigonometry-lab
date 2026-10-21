import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';
import {ads} from '../src/lib/ads.mjs';

test('Adsterra units are well-formed and tied to the production domain',()=>{const keys=[ads.native,ads.leaderboard,ads.mobile,ads.rectangle];for(const key of keys)assert.match(key,/^[0-9a-f]{32}$/);assert.equal(new Set(keys).size,keys.length);assert.equal(new URL(ads.host).protocol,'https:');const site=readFileSync(new URL('../astro.config.mjs',import.meta.url),'utf8').match(/site:\s*'([^']+)'/)[1];assert.equal(new URL(site).hostname,ads.domain);});
