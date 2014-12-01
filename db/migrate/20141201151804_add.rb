class Add < ActiveRecord::Migration
  def change
    create_table :locations do |t|
      t.float :latitude, null:false
      t.float :longitude, null:false
      t.string :address
      t.integer :place_id
    end

    add_column :posts, :location_id, :integer, {default: 1}
  end
end
