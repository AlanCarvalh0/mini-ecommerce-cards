// ===== B.1. Base de dados (JSON) =====
const data = {
    produtos: [
        {
            id: 1,
            nome: "iPhone 13",
            preco: 3999.90,
            categoria: "Celulares",
            imagem: "ai.png",
            descricao: "Smartphone Apple com câmera dupla e tela OLED.",
            emEstoque: true
        },
        {
            id: 2,
            nome: "Galaxy S22",
            preco: 3499.00,
            categoria: "Celulares",
            imagem: "22.png",
            descricao: "Smartphone Samsung com tela AMOLED e boa performance.",
            emEstoque: true
        },
        {
            id: 3,
            nome: "Notebook Dell Inspiron",
            preco: 2899.90,
            categoria: "Notebooks",
            imagem: "note.png",
            descricao: "Notebook para uso geral, bom custo-benefício.",
            emEstoque: false
        },
        {
            id: 4,
            nome: "MacBook Air M2",
            preco: 8999.00,
            categoria: "Notebooks",
            imagem: "m2.png",
            descricao: "Notebook Apple leve e potente, ideal para trabalho e estudo.",
            emEstoque: true
        },
        {
            id: 5,
            nome: "Fone Bluetooth JBL",
            preco: 199.90,
            categoria: "Acessórios",
            imagem: "fone.png",
            descricao: "Fone sem fio com boa qualidade de som e bateria longa.",
            emEstoque: true
        },
        {
            id: 6,
            nome: "Carregador Turbo 20W",
            preco: 89.90,
            categoria: "Acessórios",
            imagem: "turbo.png",
            descricao: "Carregador rápido compatível com diversos celulares.",
            emEstoque: true
        },
        {
            id: 7,
            nome: "Controle PS5",
            preco: 449.90,
            categoria: "Games",
            imagem: "ps5.png",
            descricao: "Controle sem fio DualSense para PlayStation 5.",
            emEstoque: false
        },
        {
            id: 8,
            nome: "Headset Gamer HyperX",
            preco: 349.90,
            categoria: "Games",
            imagem: "x.png",
            descricao: "Headset com som surround e microfone destacável.",
            emEstoque: true
        }
    ]
};

// ===== B.3.1. formatPrice =====
function formatPrice(preco) {
    return "R$ " + preco.toFixed(2);
}

// ===== B.3.2. createProductCard =====
function createProductCard(produto) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("data-id", produto.id);
    card.style.border = "1px solid #ccc";
    card.style.padding = "10px";
    card.style.margin = "10px";

    const imagem = document.createElement("img");
    imagem.src = produto.imagem;
    imagem.alt = produto.nome;

    const titulo = document.createElement("h3");
    titulo.classList.add("card-title");
    titulo.textContent = produto.nome;

    const preco = document.createElement("p");
    preco.textContent = formatPrice(produto.preco);

    const categoria = document.createElement("p");
    categoria.textContent = "Categoria: " + produto.categoria;

    const btnDetalhes = document.createElement("button");
    btnDetalhes.textContent = "Ver detalhes";
    btnDetalhes.addEventListener("click", function() {
        showProductDetails(produto);
    });

    const btnDestacar = document.createElement("button");
    btnDestacar.textContent = "Destacar";
    btnDestacar.addEventListener("click", function() {
        card.classList.add("highlight");
    });

    card.appendChild(imagem);
    card.appendChild(titulo);
    card.appendChild(preco);
    card.appendChild(categoria);
    card.appendChild(btnDetalhes);
    card.appendChild(btnDestacar);

    return card;
}
// ===== B.3.3. renderProducts =====
function renderProducts(produtos) {
    const lista = document.getElementById("product-list");
    lista.innerHTML = "";

    produtos.forEach(function(produto) {
        const card = createProductCard(produto);
        lista.appendChild(card);
    });

    logAllCardIds();
}


// ===== B.3.4. renderCategories =====
function renderCategories() {
    const select = document.getElementById("category");
    select.innerHTML = "";

    const optionTodas = document.createElement("option");
    optionTodas.value = "todas";
    optionTodas.textContent = "Todas";
    select.appendChild(optionTodas);

    const categorias = [];
    data.produtos.forEach(function(produto) {
        if (!categorias.includes(produto.categoria)) {
            categorias.push(produto.categoria);
        }
    });

    categorias.forEach(function(categoria) {
        const option = document.createElement("option");
        option.value = categoria;
        option.textContent = categoria;
        select.appendChild(option);
    });
}
// ===== B.3.5. showProductDetails =====
function showProductDetails(produto) {
    const detalhes = document.getElementById("product-details");

    const statusEstoque = produto.emEstoque ? "Em estoque" : "Fora de estoque";

    detalhes.innerHTML = `
        <h2>${produto.nome}</h2>
        <p><strong>Preço:</strong> ${formatPrice(produto.preco)}</p>
        <p><strong>Categoria:</strong> ${produto.categoria}</p>
        <p><strong>Status:</strong> ${statusEstoque}</p>
        <p><strong>Descrição:</strong> ${produto.descricao}</p>
    `;
}

// ===== B.4. Eventos =====
document.querySelector("#search").addEventListener("input", function() {
    const resultado = filterProducts();
    renderProducts(resultado);
});

document.querySelector("#category").addEventListener("change", function() {
    const resultado = filterProducts();
    renderProducts(resultado);
});

document.getElementById("btnRender").addEventListener("click", function() {
    const resultado = filterProducts();
    renderProducts(resultado);
});

// ===== Inicialização =====
renderCategories();
renderProducts(data.produtos);

// ===== B.5. querySelectorAll (obrigatório) =====
function logAllCardIds() {
    const cards = document.querySelectorAll(".card");
    cards.forEach(function(card) {
        console.log("Card renderizado - data-id:", card.getAttribute("data-id"));
    });
}

function renderProducts(produtos) {
    const lista = document.getElementById("product-list");
    lista.innerHTML = "";

    produtos.forEach(function(produto) {
        const card = createProductCard(produto);
        lista.appendChild(card);
    });
}