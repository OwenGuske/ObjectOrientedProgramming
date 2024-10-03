// Car class Definition
class Car 
{
  constructor(name, model, year, price) 
  {
    this.name = name;
    this.model = model;
    this.year = year;
    this.price = price;
  }
  
// Method to calculate price after depreciation
  calculatePrice(currentYear) 
  {
    // Calculate the age of the car
    const age = currentYear - this.year;
    // Depreciate price by $500 per year
    const depreciatedPrice = Math.max(this.price - (age * 500), 0);
    return depreciatedPrice;
  }
}

// Class definition
class CarManager 
{
  constructor() 
  {
    this.cars = [];
  }
// Method to add a car to inventory
  addCar(car) 
  {
    this.cars.push(car);
  }

  // Method to display all cars in inventory
  displayCars() 
  {
    const carList = document.getElementById('car-list');
    carList.innerHTML = '';

    this.cars.forEach((car, index) => 
      {
      const currentYear = new Date().getFullYear();
      const depreciatedPrice = car.calculatePrice(currentYear);
      carList.innerHTML += `
        <li>
          ${car.name} ${car.model} (${car.year}) - Price: $${depreciatedPrice}
        </li>`;
    });
  }
// Method to both display and calculate total price of ALL cars after depreciation
  showTotalPrice() 
  {
    const currentYear = new Date().getFullYear();
    const totalPrice = this.cars.reduce((total, car) => 
    {
      return total + car.calculatePrice(currentYear);
    }, 0);

    document.getElementById('total-price').innerText = `Total Inventory Price: $${totalPrice}`;
  }
}

// Event listener setup
document.addEventListener('DOMContentLoaded', () => 
  {
  const carManager = new CarManager();

  // Event listener for 'Add Car' 
  document.getElementById('add-car').addEventListener('click', () => 
    {
    // Get input values from the form
    const name = document.getElementById('name').value;
    const model = document.getElementById('model').value;
    const year = parseInt(document.getElementById('year').value);
    const price = parseFloat(document.getElementById('price').value);

    // Input fields validated before adding a new car
    if (name && model && year && price) 
    {
      const newCar = new Car(name, model, year, price);
      carManager.addCar(newCar);
      carManager.displayCars();

      // Form fields cleared after adding a car
      document.getElementById('car-form').reset();
    } else 
    {
      alert('Please fill out all fields correctly!');
    }
  });

  // Event listener for 'Calculate Total Price' 
  document.getElementById('calculate-total').addEventListener('click', () => 
  {
    carManager.showTotalPrice();
  });
  
});
