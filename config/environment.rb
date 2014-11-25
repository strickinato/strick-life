# Load the Rails application.
require File.expand_path('../application', __FILE__)

# Initialize the Rails application.
Rails.application.initialize!

config.assets.compile = true
config.serve_static_assets = true
config.log_level = :debug
