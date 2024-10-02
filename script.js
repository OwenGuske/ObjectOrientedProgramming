
class Car 
{
  constructor(name, model, year, price) 
  {
    this.name = name;
    this.model = model;
    this.year = year;
    this.price = price;
  }

  calculatePrice(currentYear) 
  {
    // Calculate the age of the car
    const age = currentYear - this.year;
    // Depreciate price by $500 per year
    const depreciatedPrice = Math.max(this.price - (age * 500), 0);
    return depreciatedPrice;
  }
}

class CarManager {
  constructor() {
    this.cars = [];
  }

  addCar(car) {
    this.cars.push(car);
  }

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
