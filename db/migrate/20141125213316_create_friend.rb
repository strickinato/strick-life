class CreateFriend < ActiveRecord::Migration
  def change
    create_table :friends do |t|
      t.string :name, null: false

      t.timestamps
    end

    add_index :friends, :name
  end
end
