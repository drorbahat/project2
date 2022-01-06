$(() => {
    $('#spinner-container').hide();

    const getData = () => {
        $.ajax({
            url: "https://api.coingecko.com/api/v3/coins/list",
            success: data => {
                first100Arr = []
                for (let i = 0; i < 100; i++) {
                    let element = data[i];
                    first100Arr.push(element)
                }
                displayDataToGrid(first100Arr)
            }
        });
    }

    const displayDataToGrid = (first100Arr) => {
        const cardContainer = $('#cards-container')
        let cards = ``
        first100Arr.forEach(element => {
            cards += `
            <div class="col-sm-4 ">
            <div class="card shadow">
            <div class="card-body">
            <div>
            <h3 class="card-title">${element.symbol}</h3>
            </div>
            <p class="card-text">${element.name}</p>
            <button class="btn btn-primary">show more</button>
            </div>
            </div>
            </div>
            `
        });

        cardContainer.append(cards)
    }

    $('#home-button').click(function (e) {
        $('#spinner-container').show();
        getData()
        $('#spinner-container').hide();
    });

    
})

