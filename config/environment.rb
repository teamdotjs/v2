# Load the Rails application.
require_relative 'application'

env_vars = File.join(Rails.root, '.env')
load(env_vars) if File.exist?(env_vars)

# Initialize the Rails application.
Rails.application.initialize!
