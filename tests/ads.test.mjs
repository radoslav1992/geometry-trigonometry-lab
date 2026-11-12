import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';
import {ads,adsEnabled,anyAds} from '../src/lib/ads.mjs';

test('ads are switched off (no unit keys) and stay tied to the production domain',()=>{for(const key of [ads.leaderboard,ads.mobile,ads.rectangle])assert.equal(key,'','Ads are off. Before setting keys again, restore the advertising sections of the privacy, about and teacher pages.');assert.deepEqual(adsEnabled,{leaderboard:false,rectangle:false});assert.equal(anyAds,false);assert.equal(new URL(ads.host).protocol,'https:');const site=readFileSync(new URL('../astro.config.mjs',import.meta.url),'utf8').match(/site:\s*'([^']+)'/)[1];assert.equal(new URL(site).hostname,ads.domain);});
