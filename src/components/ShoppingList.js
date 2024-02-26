import React, { useState, useEffect } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  function handleAddItem(item) {
    setItems([...items, item])
  }

  function handleUpdateItem(newItem) {
    const updatedItems = items.map(item => {
      if(item.id === newItem.id) {
        return newItem
      } else {
        return item
      }
    })
    setItems(updatedItems)
  }

  function handleDeleteItem(targetItem) {
    const updatedItems = items.filter(item => {
      if(item.id === targetItem.id) {
        return false
      } else return true
    })
    setItems(updatedItems)
  }

  useEffect(() => {
    fetch('http://localhost:4000/items')
      .then(res => res.json())
      .then(items => setItems(items))
  }, [])

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm onAddItem={handleAddItem}/>
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} item={item} onUpdateItem={handleUpdateItem} onDeleteItem={handleDeleteItem}/>
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
