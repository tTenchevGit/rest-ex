document.getElementById('itemForm').addEventListener('submit', async function (event) {
    event.preventDefault(); 

    const url = 'http://localhost:3000/items';
    const id = document.getElementById('id').value;
    const name = document.getElementById('name').value;

    const newItem = {
        id: Number(id),
        name: name,
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newItem),
        });

        if (!response.ok) {
            const message = `An error has occurred: ${response.status}`;
            throw new Error(message);
        }

        const addedItem = await response.json(); // Corrected to use 'addedItem' consistently
        console.log(addedItem);

        const ul = document.getElementById('servicesList');
        const li = document.createElement('li');
        li.textContent = addedItem.name;
        ul.appendChild(li);
        
        // Clear the form inputs
        document.getElementById('id').value = '';
        document.getElementById('name').value = '';

    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
});
