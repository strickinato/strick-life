class Taggings < ActiveRecord::Migration
  def change
    create_table :taggings do |t|
      t.string :type, null: false
      t.integer :tagging_id, null: false
      t.integer :post_id, null: false

      t.timestamps
    end

    add_index :taggings, :type
    add_index :taggings, :post_id
    add_index :taggings, :tagging_id
  end
end
