const input = {
    "id": "0001",
    "type": "donut",
    "name": "Cake",
    "ppu": 0.55,
    "batters": {
      "batter": [
        { "id": "1001", "type": "Regular" },
        { "id": "1002", "type": "Chocolate" },
        { "id": "1003", "type": "Blueberry" },
        { "id": "1004", "type": "Devil's Food" }
      ]
    },
    "topping": [
      { "id": "5001", "type": "None" },
      { "id": "5002", "type": "Glazed" },
      { "id": "5005", "type": "Sugar" },
      { "id": "5007", "type": "Powdered Sugar" },
      { "id": "5006", "type": "Chocolate with Sprinkles" },
      { "id": "5003", "type": "Chocolate" },
      { "id": "5004", "type": "Maple" }
    ]
  };
  
  const input2={
   "employee": {
    "name": {
     "firstName": "nara",
     "lastName": "simha"
    },
    "address": [
     {
      "street": "a",
      "city": "b",
      "state": "c"
     },
     {
      "street": "a1",
      "city": "b1",
      "state": "c1"
     }
    ]
   }
  }
  
  function flattenObject(obj, path = []) {
    let result = [];
  
    for (let key in obj) {
      if(Array.isArray(obj[key]))
      {
        result.push({ key: [...path, key], value: obj[key] });
      }
      else if (typeof obj[key] === 'object') {
        result.push(...flattenObject(obj[key], [...path, key]));
      } else {
        result.push({ key: [...path, key], value: obj[key] });
      }
    }
  
    return result;
  }
  
  console.log("For input 1")
  console.log(JSON.stringify(flattenObject(input)));
  console.log("For input 2")
  console.log(JSON.stringify(flattenObject(input2)));
