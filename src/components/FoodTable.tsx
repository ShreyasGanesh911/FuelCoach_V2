import React from 'react'

export default function FoodTable() {
  return (
    <table className="table table-dark">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Category</th>
      <th scope="col">Name</th>
      <th scope="col">Qty</th>
      <th scope="col">Calories</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Breakfast</td>
      <td>Dosa</td>
      <td>3</td>
      <td>360</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Lunch</td>
      <td>Roti</td>
      <td>2</td>
      <td>450</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td >Dinner</td>
      <td>Rice</td>
      <td>1</td>
      <td>240</td>
    </tr>
    <tr>
        <td colSpan={1}></td>
        <td colSpan={3}>Total</td>
        <td>1050</td>
    </tr>
  </tbody>
</table>
  )
}
