import { useEffect, useState } from "react";
import { Accordion } from "react-bootstrap";

export function IngredientList(
  { ingredients, handleIngredientClick, isChecked },
) {
  const [checkedItems, setCheckedItems] = useState(
    ingredients.map((ingredient) => isChecked),
  );

  const handleItemCheck = (index) => {
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index] = !newCheckedItems[index];
    setCheckedItems(newCheckedItems);
  };

  useEffect(() => {
    setCheckedItems(ingredients.map((ingredient) => isChecked));
  }, [ingredients]);

  return (
    <Accordion>
      {ingredients.map((ingredient, index) => {
        return (
          <Accordion.Item eventKey={index} key={index}>
            <Accordion.Header>
              <input
                name={ingredient.name}
                type="checkbox"
                checked={checkedItems[index]}
                onChange={(e) => {
                  handleItemCheck(index);
                  if (e.target.checked) {
                    handleIngredientClick((
                      prev,
                    ) => [...prev, ingredient]);
                  } else {
                    handleIngredientClick((prev) =>
                      prev.filter((p) => p !== ingredient)
                    );
                  }
                }}
                onClick={(e) => e.stopPropagation()}
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
