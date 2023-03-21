// @ts-check
import { test, expect } from '@playwright/test';
// base URL in config 'https://petstore.swagger.io/v2/',

const defaultData = {
  "category": {
    "id": 7878,
    "name": "unknown category"
  },
  "name": "Buddy",
  "status": "available"
}

test('Should create new pet, get pet and delete pet', async ({ request }) => {
  const petId = Math.floor(Math.random() * 10000) + 20000;
  
  const newPet = await request.post(`pet`, {  // add net pet (POST)
    data: {...defaultData, ...{"id": petId}}
  })

  expect(newPet.ok()).toBeTruthy();
  expect(newPet.status()).toEqual(200);
  const addPetResponse = await newPet.json()
  console.log('\n Pet has been added. Response body:')
  console.log(addPetResponse)

  const getPet = await request.get(`pet/${petId}`, {})  // get pet (GET)

  expect(getPet.ok()).toBeTruthy();
  expect(getPet.status()).toEqual(200);
  const getPetResponse = await getPet.json()
  console.log('\n Pet has been got. Response body:')
  console.log(getPetResponse)

  const deletePet = await request.delete(`pet/${petId}`, {})  // delete pet (DELETE)

  expect(deletePet.ok()).toBeTruthy();
  expect(deletePet.status()).toEqual(200);
  const deletePetResponse = await deletePet.json()
  console.log('\n Pet has been deleted. Response body:')
  console.log(deletePetResponse)
});
