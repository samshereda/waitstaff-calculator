$(function(){
  const store = {
    meals: []
  };

  function render(){
    $('main').html('<h1>Waitstaff Calculator</h1>' + generateForm() + generateCharges() + generateEarnings());
  }

  function generateForm(){
    return `<section>
    <h2>Enter the meal details</h2>
    <form>
      <label for="meal-price">Base Meal Price $</label>
      <input type="number" step="0.01" id="meal-price" name="meal-price">
      <br>
      <label for="tax-rate">Tax Rate %</label>
      <input type="number" step="0.01" id="tax-rate" name="tax-rate">
      <br>
      <label for="tip-percentage">Tip Percentage %</label>
      <input type="number" id="tip-percentage" name="tip-percentage">
      <br>
      <input type="submit" value="Submit">
      <input type="reset" value="Cancel">
    </form>
  </section>`;
  }

  function generateCharges(){
    if (store.meals.length){
      const meal = store.meals[store.meals.length - 1];
      const subtotal = calculateSubtotal(meal);
      const tip = calculateTip(meal);
      console.log(subtotal);
      console.log(tip);
      return `<section>
      <h2>Customer Charges</h2>
      <p>Subtotal ${subtotal.toFixed(2)}</p>
      <p>Tip ${tip.toFixed(2)}</p>
      <p>Total ${(subtotal + tip).toFixed(2)}</p>
      </section>`;
    }
    return '';
  }

  function generateEarnings(){
    const tipTotal = store.meals.reduce(function (total, meal){
      return total + calculateTip(meal);
    }, 0);
    return `<section>
      <h2>My Earnings Info</h2>
      <p>Tip Total: ${tipTotal.toFixed(2)}</p>
      <p>Meal Count: ${store.meals.length}</p>
      <p>Average Tip Per Meal: ${(tipTotal/store.meals.length).toFixed(2)}</p>
    </section>`;
  }

  function calculateSubtotal(meal){
    return meal.mealPrice * (1+meal.taxRate/100);
  }

  function calculateTip(meal){
    return calculateSubtotal(meal) * meal.tipPercentage/100;
  }

  function handleFormSubmit(){
    $('main').on('submit', 'form', event => {
      event.preventDefault();
      const mealPrice = $('form').find('input[name="meal-price"]').val();
      const taxRate = parseInt($('form').find('input[name="tax-rate"]').val());
      const tipPercentage = parseInt($('form').find('input[name="tip-percentage"]').val());
      store.meals.push({mealPrice, taxRate, tipPercentage});
      console.log(store);
      render();
    });
  }

  render();
  handleFormSubmit();
});