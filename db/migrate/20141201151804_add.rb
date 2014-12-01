class Add < ActiveRecord::Migration
  def change
    create_table :locations do |t|
      t.integer :post_id, null: false
      t.float :latitude, null:false
      t.float :longitude, null:false
      t. integer :place_id
    end
  end
end
