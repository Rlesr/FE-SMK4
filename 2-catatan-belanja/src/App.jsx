import { useState } from "react";

const groceryItems = [
  {
    id: 1,
    name: "Kopi Arabica",
    quantity: 2,
    checked: true,
  },
  {
    id: 2,
    name: "Gula Pasir",
    quantity: 5,
    checked: false,
  },
  {
    id: 3,
    name: "Air Mineral",
    quantity: 3,
    checked: false,
  },
  {
    id:4,
    name: "teh matcha",
    quantity:10,
    checked: true
  }
];


export default function App() {
  const [items, setItems] = useState(groceryItems)
  return (
    <div classNameName="app">
      <Header />
      <Form/>
      <GroceryList items={items} />
      <Footer />
</div>);
}

function Header() {
  return <h1>Catatan Belanjaku 📝</h1>
}
function Footer() {
  return (
     <footer className="stats">
      Ada 10 barang di daftar belanjaan, 5 barang sudah dibeli (50%)
      </footer>
  );
}
function Form() {
  const [name, SetName] = useState ('');

  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    if (!name) return;

    const newItem = {name , quantity, checked: false, id: Date.now()}
    
    console.log(newItem);

    SetName('');
    setQuantity(1);
  }

  const quantityNum = [...Array(20)].map((_, i) => (
    <option value={i + 1} key={i + 1}>
      {i + 1}
      </option>
  ));
  return (<form className="add-form" onSubmit={handleSubmit}>
  <h3>Hari ini belanja apa kita?</h3>
  <div>
    <select value={quantity} oneChange={(e) => setQuantity(Number(e.target.value))}>
     {quantityNum}
    </select>
    <input type="text" placeholder="nama barang..." value={name} onChange={(e) => SetName(e.target.value)}/>
  </div>
  <button>Tambah</button>
</form>)
}

function GroceryList(items) {
  return (
    <>
    <div className="list">
    <ul>
      {items.map((item) => (
        <Item item={item} key={item.id} />
      ))}
      
    </ul>
      </div>
      <div className="actions">
    <select>
      <option value="input">Urutkan berdasarkan urutan input</option>
      <option value="name">Urutkan berdasarkan nama barang</option>
      <option value="checked">Urutkan berdasarkan ceklis</option>
    </select>
    <button>Bersihkan Daftar</button>
      </div>
  </>
  )
}

function Item({item}) {
  return (
    <li key={item.id}>
          <input type="checkbox" checked={item.checked}/>
          <span style={item.checked ?{ textDecoration: 'line-through' }:{}}> 
          {item.quantity} {item.name} </span>
          <button>&times;</button>
        </li>
  )
}