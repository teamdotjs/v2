source 'https://rubygems.org'
ruby '2.2.5'

# Only use Active Record, Active Support, and Railties from rails
gem 'activerecord', '~> 5.0.0', '>= 5.0.0.1'
gem 'activesupport', '~> 5.0.0', '>= 5.0.0.1'
gem 'railties', '~> 5.0.0', '>= 5.0.0.1'
# Use Puma as the app server
gem 'puma', '~> 3.0'
# Use Rack CORS for handling Cross-Origin Resource Sharing (CORS), making cross-origin AJAX possible
gem 'rack-cors'
# Ruby linter
gem 'rubocop', '~> 0.43.0'
# Hash passwords
gem 'bcrypt', '~> 3.1', '>= 3.1.11'

group :development, :test do
  # Use sqlite3 for dev and test databases
  gem 'sqlite3', '~> 1.3', '>= 1.3.11'
end

group :test do
  # Customize minitest output
  gem 'minitest-reporters', '~> 1.1', '>= 1.1.12'
  # One-liners that test common rails functionality
  gem 'shoulda', '~> 3.5'
  # Code coverage
  gem 'simplecov', '~> 0.12.0'
  # Assert json objects match
  gem 'json_expressions', '~> 0.8.3'
end

group :production do
  # Use postgresql as the database for Active Record
  gem 'pg', '~> 0.19'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
