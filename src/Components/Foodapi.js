import React, { useState, useEffect } from "react";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import './Foodapi.css';

function Foodapi() {
  const [query, setQuery] = useState([]);
  const [receipes, setReceipes] = useState([]);

  const YOUR_APP_ID = "f46effe9";
  const YOUR_APP_KEY = "923135df4f4c721fefc19583928d3d8a";

  const url = `https://api.edamam.com/search?q=${query}&
    app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&calories=591-722&health=alcohol-free`;

  const getReceipes = async () => {
    try {
      var result = await Axios.get(url);
      setReceipes(result.data.hits);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getReceipes();
  }, []);
  const onSubmit = (e) => {
    e.preventDefault();
    getReceipes();
  };
  //console.log(receipes);

  return (
    <div>
      <h1> Food Receipe Chart</h1>
      <form class="form-inline" onSubmit={onSubmit}>
        <div class="form-group">
          <label>Enter here</label>
          <input
            type="text"
            class="form-control"
            placeholder="banana"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <button type="submit" class="btn btn-default">
          Click here
        </button>
      </form>
      {receipes?.map((item) => {
        console.log(item);
        return (
          <table class="table table-bordered">
            <tr>
              <th>Recipe Name</th>
            </tr>

            <tr>
              <td class="active">{item.recipe.label}</td>
            </tr>

            <th>Link to recipe</th>
            <tr>
              <td class="active">{item.recipe.uri}</td>
            </tr>
          </table>
        );
      })}
    </div>
  );
}

export default Foodapi;
