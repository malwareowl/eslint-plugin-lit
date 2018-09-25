/**
 * @fileoverview Detects usages of legacy binding syntax
 * @author James Garbutt <htttps://github.com/43081j>
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import rule = require('../../rules/no-legacy-template-syntax');
import {RuleTester} from 'eslint';

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parserOptions: {
    sourceType: 'module'
  }
});

ruleTester.run('no-legacy-template-syntax', rule, {
  valid: [
    {code: 'html`<x-foo .bar=${true} ?foo=${true} @baz=${fn}></x-foo>`'},
    {code: 'html`<x-foo></x-foo>`'},
    {code: 'html`<x-foo bar baz></x-foo>`'},
    {code: 'html`<x-foo bar baz=${true}></x-foo>`'}
  ],

  invalid: [
    {
      code: 'html`<x-foo bar$=${x}></x-foo>`',
      errors: [
        {
          message: 'Legacy lit-extended syntax is unsupported, did you mean to use "bar="?',
          line: 1,
          column: 5
        }
      ]
    },
    {
      code: 'html`<x-foo bar?=${x}></x-foo>`',
      errors: [
        {
          message: 'Legacy lit-extended syntax is unsupported, did you mean to use "?bar="?',
          line: 1,
          column: 5
        }
      ]
    },
    {
      code: 'html`<x-foo on-bar=${fn}></x-foo>`',
      errors: [
        {
          message: 'Legacy lit-extended syntax is unsupported, did you mean to use "@bar="?',
          line: 1,
          column: 5
        }
      ]
    },
    {
      code: 'html`<x-foo><x-bar ?bar=${bool} baz?=${bool}></x-bar></x-foo>`',
      errors: [
        {
          message: 'Legacy lit-extended syntax is unsupported, did you mean to use "?baz="?',
          line: 1,
          column: 31
        }
      ]
    }
  ]
});