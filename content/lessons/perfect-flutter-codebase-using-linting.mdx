---
title: Perfect Your Flutter Codebase using Two Linting Methods
description: Linting is a key part of your project, learn how to utilize it and pefect your codebase!
image: /assets/images/flutter_linting_thumbnail.webp
youtube: KEdxoubVztk
github: https://github.com/RobertBrunhage/flutter_lint_tutorial
author: Robert Brunhage
date: 02-13-2021
---
# Perfect Your Flutter Codebase with Linting

Adding linting to your project is cruicial to have a good codebase. We are going to look in to different ways on how to accomplish this!

## What is linting?

It's the process of analyzing your code, by giving your warnings or outright errors. This is better than you think as with this you will be notified when you are doing something which is not recommended and also keeps you more consistent.

## There are 2 ways!

There are 2 main ways to apply linting in your project and these are:

* A package
* Custom implementation

We will go over both of them but let's start with a **package**.

### Package

This is actually very simple! 

1. Start by creating your `analysis_options.yaml` file in the root of your Flutter application. We don't need to touch that one just yet, so keep it empty! 
2. Navigate to your `pubspec.yaml` add a package of your choice, we will go with the <a href="https://pub.dev/packages/lint" target="_blank" rel="noopener">lint package</a> but there are others as well, so just pick one you like!
3. Now navigate back to your `analysis_options.yaml` file and add the code which you can find in the package site. After you are done, your `analysis_options.yaml` file should look a little something like this:

```yaml
include: package:lint/analysis_options.yaml

linter:
  rules:
    # ------ Disable individual rules ----- #
    #                 ---                   #
    # Turn off what you don't like.         #
    # ------------------------------------- #

    # Use parameter order as in json response
    always_put_required_named_parameters_first: false
    
    # Util classes are awesome!
    avoid_classes_with_only_static_members: false


    # ------ Enable individual rules ------ #
    #                 ---                   #
    # These rules here are good but too     #
    # opinionated to enable them by default #
    # ------------------------------------- #

    # Make constructors the first thing in every class
    sort_constructors_first: true

    # The new tabs vs. spaces. Choose wisely
    prefer_single_quotes: true
    prefer_double_quotes: true

    # Good packages document everything
    public_member_api_docs: true
    
    # Blindly follow the Flutter code style, which prefers types everywhere
    always_specify_types: true
  
    # Back to the 80s
    lines_longer_than_80_chars: true
```

4. Profit, now you will notice that your code will warn you about more things, but you can always change rules in this file!

### Custom Implementation

This one is a bit more fun and the one that I prefer most of the time!

1. Create a `all_lint_rules.yaml` file, this will contain all the different rules we can find, and if you find more rules in the future just add it in here.
2. Include this file in the `analysis_options.yaml` like we did with the package!
3. Now in the `analysis_options.yaml` file we can turn off the rules we don't want, that is also done in the same manner as the package!
4. Profit!

The following two files I got from the <a href="https://riverpod.dev" target="_blank" rel="noopener">Riverpod Package</a>, and the rules that <a href="https://twitter.com/remi_rousselet" target="_blank" rel="noopener">Remi</a> did so a big shoutout to him!

Here are the two files start with the `all_lint_rules.yaml` file:

```yaml
linter:
  rules:
    - always_declare_return_types
    - always_put_control_body_on_new_line
    - always_put_required_named_parameters_first
    - always_require_non_null_named_parameters
    - always_specify_types
    - annotate_overrides
    - avoid_annotating_with_dynamic
    - avoid_as
    - avoid_bool_literals_in_conditional_expressions
    - avoid_catches_without_on_clauses
    - avoid_catching_errors
    - avoid_classes_with_only_static_members
    - avoid_double_and_int_checks
    - avoid_empty_else
    - avoid_equals_and_hash_code_on_mutable_classes
    - avoid_escaping_inner_quotes
    - avoid_field_initializers_in_const_classes
    - avoid_function_literals_in_foreach_calls
    - avoid_implementing_value_types
    - avoid_init_to_null
    - avoid_js_rounded_ints
    - avoid_null_checks_in_equality_operators
    - avoid_positional_boolean_parameters
    - avoid_print
    - avoid_private_typedef_functions
    - avoid_redundant_argument_values
    - avoid_relative_lib_imports
    - avoid_renaming_method_parameters
    - avoid_return_types_on_setters
    - avoid_returning_null
    - avoid_returning_null_for_future
    - avoid_returning_null_for_void
    - avoid_returning_this
    - avoid_setters_without_getters
    - avoid_shadowing_type_parameters
    - avoid_single_cascade_in_expression_statements
    - avoid_slow_async_io
    - avoid_types_as_parameter_names
    - avoid_types_on_closure_parameters
    - avoid_unnecessary_containers
    - avoid_unused_constructor_parameters
    - avoid_void_async
    - avoid_web_libraries_in_flutter
    - await_only_futures
    - camel_case_extensions
    - camel_case_types
    - cancel_subscriptions
    - cascade_invocations
    - close_sinks
    - comment_references
    - constant_identifier_names
    - control_flow_in_finally
    - curly_braces_in_flow_control_structures
    - diagnostic_describe_all_properties
    - directives_ordering
    - empty_catches
    - empty_constructor_bodies
    - empty_statements
    - file_names
    - flutter_style_todos
    - hash_and_equals
    - implementation_imports
    - invariant_booleans
    - iterable_contains_unrelated_type
    - join_return_with_assignment
    - leading_newlines_in_multiline_strings
    - library_names
    - library_prefixes
    - lines_longer_than_80_chars
    - list_remove_unrelated_type
    - literal_only_boolean_expressions
    - missing_whitespace_between_adjacent_strings
    - no_adjacent_strings_in_list
    - no_duplicate_case_values
    - no_logic_in_create_state
    - no_runtimeType_toString
    - non_constant_identifier_names
    - null_closures
    - omit_local_variable_types
    - one_member_abstracts
    - only_throw_errors
    - overridden_fields
    - package_api_docs
    - package_names
    - package_prefixed_library_names
    - parameter_assignments
    - prefer_adjacent_string_concatenation
    - prefer_asserts_in_initializer_lists
    - prefer_asserts_with_message
    - prefer_collection_literals
    - prefer_conditional_assignment
    - prefer_const_constructors
    - prefer_const_constructors_in_immutables
    - prefer_const_declarations
    - prefer_const_literals_to_create_immutables
    - prefer_constructors_over_static_methods
    - prefer_contains
    - prefer_double_quotes
    - prefer_equal_for_default_values
    - prefer_expression_function_bodies
    - prefer_final_fields
    - prefer_final_in_for_each
    - prefer_final_locals
    - prefer_for_elements_to_map_fromIterable
    - prefer_foreach
    - prefer_function_declarations_over_variables
    - prefer_generic_function_type_aliases
    - prefer_if_elements_to_conditional_expressions
    - prefer_if_null_operators
    - prefer_initializing_formals
    - prefer_inlined_adds
    - prefer_int_literals
    - prefer_interpolation_to_compose_strings
    - prefer_is_empty
    - prefer_is_not_empty
    - prefer_is_not_operator
    - prefer_iterable_whereType
    - prefer_mixin
    - prefer_null_aware_operators
    - prefer_relative_imports
    - prefer_single_quotes
    - prefer_spread_collections
    - prefer_typing_uninitialized_variables
    - prefer_void_to_null
    - provide_deprecation_message
    - public_member_api_docs
    - recursive_getters
    - slash_for_doc_comments
    - sort_child_properties_last
    - sort_constructors_first
    - sort_pub_dependencies
    - sort_unnamed_constructors_first
    - test_types_in_equals
    - throw_in_finally
    - type_annotate_public_apis
    - type_init_formals
    - unawaited_futures
    - unnecessary_await_in_return
    - unnecessary_brace_in_string_interps
    - unnecessary_const
    - unnecessary_final
    - unnecessary_getters_setters
    - unnecessary_lambdas
    - unnecessary_new
    - unnecessary_null_aware_assignments
    - unnecessary_null_in_if_null_operators
    - unnecessary_overrides
    - unnecessary_parenthesis
    - unnecessary_raw_strings
    - unnecessary_statements
    - unnecessary_string_escapes
    - unnecessary_string_interpolations
    - unnecessary_this
    - unrelated_type_equality_checks
    - unsafe_html
    - use_full_hex_values_for_flutter_colors
    - use_function_type_syntax_for_parameters
    - use_key_in_widget_constructors
    - use_raw_strings
    - use_rethrow_when_possible
    - use_setters_to_change_properties
    - use_string_buffers
    - use_to_and_as_if_applicable
    - valid_regexps
    - void_checks
```

And now we can just include this file in `analysis_options.yaml` as well as adding some additional configuration, here is an example:

```yaml
include: all_lint_rules.yaml

analyzer:
  exclude:
    - "**/*.g.dart"
    - "**/*.freezed.dart"
    # This is generated from the i18n vscode extension
    - "**/i18n.dart"

  strong-mode:
    implicit-casts: false
    implicit-dynamic: false

  errors:
    # Otherwise cause the import of all_lint_rules to warn because of some rules conflicts.
    # We explicitly enabled even conflicting rules and are fixing the conflict
    # in this file
    included_file_warning: ignore

    # Causes false positives (https://github.com/dart-lang/sdk/issues/41571
    top_level_function_literal_block: ignore

linter:
  rules:
    # Personal preference. I don't find it more readable
    cascade_invocations: false

    # Conflicts with `prefer_single_quotes`
    # Single quotes are easier to type and don't compromise on readability.
    prefer_double_quotes: false

    # Conflicts with `omit_local_variable_types` and other rules.
    # As per Dart guidelines, we want to avoid unnecessary types to make the code
    # more readable.
    # See https://dart.dev/guides/language/effective-dart/design#avoid-type-annotating-initialized-local-variables
    always_specify_types: false

    # Incompatible with `prefer_final_locals`
    # Having immutable local variables makes larger functions more predictible
    # so we will use `prefer_final_locals` instead.
    unnecessary_final: false

    # Not quite suitable for Flutter, which may have a `build` method with a single
    # return, but that return is still complex enough that a "body" is worth it.
    prefer_expression_function_bodies: false

    # Conflicts with the convention used by flutter, which puts `Key key`
    # and `@required Widget child` last.
    always_put_required_named_parameters_first: false

    # `as` is not that bad (especially with the upcoming non-nullable types).
    # Explicit exceptions is better than implicit exceptions.
    avoid_as: false

    # This project doesn't use Flutter-style todos
    flutter_style_todos: false

    # There are situations where we voluntarily want to catch everything,
    # especially as a library.
    avoid_catches_without_on_clauses: false

    # Boring as it sometimes force a line of 81 characters to be split in two.
    # As long as we try to respect that 80 characters limit, going slightly
    # above is fine.
    lines_longer_than_80_chars: false

    # Conflicts with disabling `implicit-dynamic`
    avoid_annotating_with_dynamic: false

    # Not nessecary for an application and more pointed towards public API's
    public_member_api_docs: false

    # Temporarly
    diagnostic_describe_all_properties: false

    # I think it's easier to read if they are grouped together
    sort_pub_dependencies: false
```

Just to remind you, these rules are not set in stone so please change them if you find a better usecase for your own project, my tip is to just keep the comments updated with your reasoning as it will make it clear in the long run why you disable certain rules.

## Conclusion

Add linting, it will make your code better :)
