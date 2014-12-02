class Location < ActiveRecord::Base
  validates :longitude, :latitude, presence: true
  
  has_many :posts
end
