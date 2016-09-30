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

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug', platform: :mri
  # Use sqlite3 for dev and test databases
  gem 'sqlite3', '~> 1.3', '>= 1.3.11'
end

group :development do
  gem 'listen', '~> 3.0.5'
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
end

group :production do
  # Use postgresql as the database for Active Record
  gem 'pg', '~> 0.19'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
