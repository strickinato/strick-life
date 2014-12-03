class Tag < ActiveRecord::Base
  include Taggable
  
  validates :name, presence: true
end
