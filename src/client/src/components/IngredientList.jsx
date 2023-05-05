import { useState } from "react";
import { Accordion } from "react-bootstrap";

export function IngredientList({ ingredients, handleIngredientClick }) {
  const [checkedItems, setCheckedItems] = useState(
    ingredients.map((ingredient) => true),
  );

  const handleItemCheck = (index) => {
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index] = !newCheckedItems[index];
    setCheckedItems(newCheckedItems);
  };

  return (
    <Accordion>
      {ingredients.map((ingredient, index) => {
        return (
          <Accordion.Item eventKey={index} key={index}>
            <Accordion.Header>
              <input
                type="checkbox"
                checked={checkedItems[index]}
                style={{ marginRight: "10px" }}
                onChange={(e) => {
                  handleItemCheck(index);
                  if (e.target.checked) {
                    handleIngredientClick((
                      prev,
                    ) => [...prev, ingredient.name]);
                  } else {
                    handleIngredientClick((prev) =>
                      prev.filter((p) => p !== ingredient.name)
                    );
                  }
                }}
              />
              {ingredient.name}
            </Accordion.Header>
            <Accordion.Body>
              <p>{ingredient.description}</p>
            </Accordion.Body>
          </Accordion.Item>
        );
      })}
    </Accordion>
  );
}
