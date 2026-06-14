function parseCount(value) {
  const parsedValue = Number.parseFloat(value);

  if (Number.isNaN(parsedValue)) {
    throw new Error("Невалидное значение");
  }

  return parsedValue;
}

function validateCount(value) {
  try {
    return parseCount(value);
  } catch (error) {
    return error;
  } 
}

class Triangle {
  constructor (sideA, sideB, sideC) {
    if (sideA + sideB <= sideC || sideA + sideC <= sideB || sideB + sideC <= sideA) {
      throw new Error("Треугольник с такими сторонами не существует");
    }

    this.sideA = sideA;
    this.sideB = sideB;
    this.sideC = sideC;
  }

  get perimeter() {
    return this.sideA + this.sideB + this.sideC;
  }
  
  get area() {
    const halfPerimeter = this.perimeter / 2;
    const area = Math.sqrt(halfPerimeter * (halfPerimeter - this.sideA) * (halfPerimeter - this.sideB) * (halfPerimeter - this.sideC));

    return Number(area.toFixed(3));
  }
}

function getTriangle(sideA, sideB, sideC) {
  try {
    return new Triangle(sideA, sideB, sideC);
  } catch (error) {
    return {
      get area() {
        return "Ошибка! Треугольник не существует";
      },

      get perimeter() {
        return "Ошибка! Треугольник не существует";
      }
    }
  }
}