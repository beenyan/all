<?php
/*
 * This document has been generated with
 * https://mlocati.github.io/php-cs-fixer-configurator/?version=2.14#configurator
 * you can change this configuration by importing this file.
 */

return PhpCsFixer\Config::create()
    ->setIndent('  ')
    ->setRules([
        '@PhpCsFixer' => true,
        // Each line of multi-line DocComments must have an asterisk [PSR-5] and must be aligned with the first one.
        'align_multiline_comment' => false,
        // An empty line feed must precede any configured statement.
        'blank_line_before_statement' => ['statements' => []],
        // The body of each structure MUST be enclosed by braces.
        // Braces should be properly placed.
        // Body of braces should be properly indented.
        'braces' => ['position_after_functions_and_oop_constructs' => 'same'],
        // Converts implicit variables into explicit ones in double-quoted strings or heredoc syntax.
        'explicit_string_variable' => false,
        // PHP code must use the long `<?php` tags or short-echo `<?=` tags and not other tag variations.
        'full_opening_tag' => false,
        // Forbid multi-line whitespace before the closing semicolon or move the semicolon to the new line for chained calls.
        'multiline_whitespace_before_semicolons' => ['strategy' => 'no_multi_line'],
        // Replace short-echo `<?=` with long format `<?php echo` syntax.
        'no_short_echo_tag' => false,
        // Replaces superfluous `elseif` with `if`.
        'no_superfluous_elseif' => false,
    ])
    ->setFinder(
        PhpCsFixer\Finder::create()
        ->exclude('vendor')
        ->in(__DIR__)
    )
;
