class ChangeDefaultOnLocationId < ActiveRecord::Migration
  def change
    change_column_default(:posts, :location_id, nil)
  end
end
