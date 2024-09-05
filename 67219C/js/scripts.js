// Carly Brown - 10/26

const imageDiv = document.getElementById('image');
const imgElement = document.createElement('img');
const imageUrl = 'https://images.unsplash.com/photo-1619148189616-013b06952c04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80';

imgElement.src = imageUrl;
imageDiv.appendChild(imgElement);

let dateSlot = document.getElementById('adoptDate');
dateSlot.textContent = '5/18/2015';

function randomDate(
    from = new Date(2003, 4, 18),
    to = new Date()
) {
    let randomTime = from.getTime() + Math.random() * (to.getTime() - from.getTime());
    let randomDate = new Date(randomTime);
    dateSlot.textContent = randomDate.toLocaleDateString();
}

let adoptedButton = document.getElementById('generateAdoption');
$(adoptedButton).click(function () { //click jQuery
    let userRequest = new Request(`https://randomfox.ca/floof`);

    fetch(userRequest) 
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            const imageURL = data.image;

            while (imageDiv.firstChild) {
                imageDiv.removeChild(imageDiv.firstChild);
            }

            imgElement.src = imageURL;
            imgElement.alt = "Random Fox Image";
            imageDiv.appendChild(imgElement);

            randomDate();
        })
        .catch(function (err) {
            console.log("Something went wrong!", err);
        });
    });

let fox = [
    {
        id: 1,
        name: 'Morris',
        image: 'https://images.unsplash.com/photo-1697494998241-cf63976e28ac?auto=format&fit=crop&q=80&w=1740&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        altText: 'A red fox with a scar on his lip looking toward the camera while curled up against a rock',
        description: "Located: Tatamy, PA",
        price: 4385
    },
    {
        id: 2,
        name: 'Sassafras',
        image: 'https://images.unsplash.com/photo-1565219043640-28bf17bc0bb5?auto=format&fit=crop&q=80&w=1742&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        altText: 'A red fox laying in a bush and excitedly looking past the camera off into the distance',
        description: "Located: Norfolk, VA",
        price: 1827
    },
    {
        id: 3,
        name: 'Leaf',
        image: 'https://images.unsplash.com/photo-1695605118245-491fae3c931c?auto=format&fit=crop&q=80&w=1742&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        altText: 'A young fox with red and black fur markings that\'s dirty from rolling in the dirt',
        description: "Located: Wickliffe, KY",
        price: 5908
    },
    {
        id: 4,
        name: 'Penny',
        image: 'https://images.unsplash.com/photo-1689760667639-35186ffbfaad?auto=format&fit=crop&q=80&w=1740&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        altText: 'A red fox explores a snow covered forest',
        description: "Located: Litchfield, MN",
        price: 4897
    },
    {
        id: 5,
        name: 'Huckleberry',
        image: 'https://images.unsplash.com/photo-1651451682079-803dfdfc1e08?auto=format&fit=crop&q=80&w=1740&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        altText: 'A red fox curled up on the forest floor sunbathing',
        description: "Located: West Branch, MI",
        price: 2491
    }
];

let wrapper = document.getElementById("adoptable");

fox.forEach(fox => {
    let foxContainer = document.createElement('div');
    foxContainer.classList.add('fox-container');
    $(wrapper).append(foxContainer); //append jQuery

    let foxImage = document.createElement('img');
    foxImage.src = fox.image;
    foxImage.alt = fox.altText;
    $(foxContainer).append(foxImage);

    let foxName = document.createElement('p');
    foxName.classList.add('fox-name');
    foxName.textContent = fox.name;
    $(foxContainer).append(foxName); 

    let foxDescription = document.createElement('p');
    foxDescription.classList.add('fox-description');
    foxDescription.textContent = fox.description;
    $(foxContainer).append(foxDescription); 

    let foxPrice = document.createElement('p');
    foxPrice.classList.add('fox-price');
    foxPrice.textContent = 'Price: $' + fox.price.toLocaleString();
    $(foxContainer).append(foxPrice); 

    let buyButton = document.createElement('button');
    buyButton.classList.add('buy-button');
    let buyText = document.createTextNode('Buy');
    buyButton.appendChild(buyText);
    $(foxContainer).append(buyButton);
});

let cartItems = [];

function cartTotal(){
    let cartValue = 0;
    cartItems.forEach(item => {
        cartValue += item.price;
    });
    document.getElementById("cartTotal").textContent = `Total: $${cartValue.toLocaleString()}`;
}

function createCartRow(name, price) {
    let cartRow = document.createElement('div');
    let shoppingCart = document.getElementById('cart');
    cartRow.classList.add('cart-row');

    let p = document.createElement('p');
    p.classList.add('row');
    p.innerHTML = `${name}, <span class="item-cost">$${price}</span>`; 
    shoppingCart.appendChild(cartRow); 
    cartRow.appendChild(p);

    let removeButton = document.createElement('button');
    removeButton.classList.add('remove-button');
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', function () {
        removeItemFromCart(cartRow, price);
    });
    cartRow.appendChild(removeButton); 
    cartTotal();
}

function addItemToCart(e) {
    let parent = e.target.parentElement;
    let name = parent.getElementsByClassName('fox-name')[0].textContent;
    let priceText = parent.getElementsByClassName('fox-price')[0].textContent;
    let price = parseInt(priceText.replace('Price: $', '').replace(',', ''));

    let alreadyInCart = false;
    for (let i = 0; i < cartItems.length; i++) {
        if (cartItems[i].name === name) {
            alreadyInCart = true;
            break;
        }
    }

    if (e.target.classList.contains('buy-button')) {
        if (!alreadyInCart) {
            let item = {
                name: name,
                price: price
            };
            cartItems.push(item);
            createCartRow(name, price);
            cartTotal();
        } else {
            alert(`${name} is already in your cart.`);
        }
    }
}

function removeItemFromCart(cartRow, price) {
    cartRow.remove();
    cartItems = cartItems.filter(function(item) {
        return item.price !== price; 
    });
    
    cartTotal();
}

let buyButtons = document.getElementsByClassName("buy-button");
for (let button of buyButtons) {
    button.addEventListener("click", function(e){
        addItemToCart(e);
    });
}

function extraCharge() {
    let dropdown = document.getElementById("supplies");
    let option = parseInt(dropdown.value);
    if (option !== 0) {
        let selectedItem = dropdown.options[dropdown.selectedIndex];
        let name = selectedItem.text;
        let price = parseInt(selectedItem.getAttribute('data-cost'));

        let item = {
            name: name,
            price: price
        };
        cartItems.push(item);
        createCartRow(name, price);
        cartTotal();
    }
}

document.getElementById("supplies").addEventListener("change", extraCharge);