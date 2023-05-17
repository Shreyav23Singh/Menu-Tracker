const API_URL = "https://crudcrud.com/api/cd7e9599bc5c4ed682c8ca2afdb4da51/data";

// get data from API
async function getData() {
	let data = [];
	try {
		const response = await axios.get(`https://crudcrud.com/api/cd7e9599bc5c4ed682c8ca2afdb4da51/data`);
		data = response.data;
		displayData(data);
	} catch (error) {
		console.log(error);
	}
}



// add data to the API
async function addData(event) {
	event.preventDefault();
	const name = document.getElementById("name").value;
	const dish = document.getElementById("dish").value;
	const price = document.getElementById("price").value;
	const table = document.getElementById("table").value;
	try {
		await axios.post(`https://crudcrud.com/api/cd7e9599bc5c4ed682c8ca2afdb4da51/data`, {name, dish, price, table});
		getData();
	} catch (error) {
		console.log(error);
	}
	document.getElementById("name").value = "";
	document.getElementById("dish").value = "";
	document.getElementById("price").value = "";
	document.getElementById("table").value = "";
}

// edit data in the API
async function editData(id) {
	const name = prompt("Enter name:");
	const dish = prompt("Enter dish:");
	const price = prompt("Enter price:");
	const table = prompt("Enter table number (1-3):");
	if (name && dish && price && table) {
		try {
			await axios.put(`https://crudcrud.com/api/cd7e9599bc5c4ed682c8ca2afdb4da51/data/${id}`, {name, dish, price, table});
			getData();
		} catch (error) {
			console.log(error);
		}
	}
}

// delete data from the API
async function deleteData(id) {
	const confirmDelete = confirm("Are you sure you want to delete this data?");
	if (confirmDelete) {
		try {
			await axios.delete(`https://crudcrud.com/api/cd7e9599bc5c4ed682c8ca2afdb4da51/data/${id}`);
			getData();
		} catch (error) {
			console.log(error);
		}
	}
}
// display data in the table
function displayData(data) {
	document.getElementById("data").innerHTML = "";
	data.forEach(item => {
		const row = `
			<tr>
				<td>${item.name}</td>
				<td>${item.dish}</td>
				<td>${item.price}</td>
				<td>${item.table}</td>
				<td><button class="button" onclick="editData('${item._id}')">Edit</button></td>
				<td><button  class="button" onclick="deleteData('${item._id}')">Delete</button></td>
			</tr>
		`;
		document.getElementById("data").innerHTML += row;
	});
}

// load data on page load
document.addEventListener("DOMContentLoaded", () => {
	getData();
});

// add event listener to the form
document.querySelector("form").addEventListener("submit", addData);

