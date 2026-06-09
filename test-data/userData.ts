import { User } from "../types/user.types";

const timestamp = Date.now();

export const  newUser: User = {
  name: "John Doe",
  email: `john.doe${timestamp}@example.com`,
  password: "password126",
  title: "Mr",
  birth_date: "15",
  birth_month: "10",
  birth_year: "1990",
  firstname: "John",
  lastname: "Doe",
  company: "ABC Corp",
  address1: "126 Main St",
  address2: "Apt 4B",
  country: "United States",
  zipcode: "90001",
  state: "CA",
  city: "Los Angeles",
  mobile_number: "1234567890",
};

export const updatedUser: User = {
  name: "John Doe",
  email: `john.doe${timestamp}@example.com`,
  password: "password126",
  title: "Mr",
  birth_date: "15",
  birth_month: "10",
  birth_year: "1990",
  firstname: "John",
  lastname: "Doe",
  company: "Kaiba Corp",
  address1: "126 Main St",
  address2: "Apt 4B",
  country: "United States",
  zipcode: "90001",
  state: "CA",
  city: "Los Angeles",
  mobile_number: "1234567890",
};

export const newUserForCreation: User = {
  name: "Jane Smith",
  email: `jane.smith${timestamp}@example.com`,
  password: "password126",
  title: "Ms",
  birth_date: "20",
  birth_month: "12",
  birth_year: "1985",
  firstname: "Jane",
  lastname: "Smith",
  company: "XYZ Inc",
  address1: "456 Oak Ave",
  address2: "Suite 2C",
  country: "United States",
  zipcode: "90002",
  state: "NY",
  city: "New York",
  mobile_number: "0987654321",
};
