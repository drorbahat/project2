$(() => {

    let spinner = `
                    <div id="spinner-container">
                        <div id="loading-spinner" class="d-flex justify-content-center">
                            <div class="spinner-border" role="status">
                                <span class="sr-only">Loading...</span>
                            </div>
                        </div>
                    </div>
                    `

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
        let idNumCounter = 0
        first100Arr.forEach(element => {
            idNumCounter++
            cards += `
            <div class="col-sm-4 ">
                <div class="card shadow">
                    <div class="card-body">
                        <div>
                            <h3 class="card-title">${element.symbol}</h3>
                        </div>
                        <p class="card-text">${element.name}</p>
                        <div class="custom-control custom-switch">
                            <input type="checkbox" class="custom-control-input" id="switch${idNumCounter}" name="example">
                            <label class="custom-control-label" for="switch${idNumCounter}"></label>
                        </div>
                        <br>
                        <button id="${element.id}" type="button" class="btn btn-primary more-info-button">show more</button>
                        <div id="${element.id}Data" >
                        </div>
                    </div>
                </div>
            </div>
            `
        });

        cardContainer.append(cards)
        moreInfoFunction()
    }

    const moreInfoFunction = () => {
        $(".more-info-button").click(function () {
            $(this).next().collapse('toggle')
            if ($(this).next().children().length <= 0) {
                let cardId = $(this).attr("id")
                $.ajax({
                    url: `https://api.coingecko.com/api/v3/coins/${cardId}`,
                    success: function (data) {
                        appendDataContainer(data)
                    }
                });

                const appendDataContainer = (data) => {
                    let moreInfo = `
                            <div class="more-data-container">
                                    <p class="card-text">${data.market_data.current_price.usd}$</p>
                                    <p class="card-text">${data.market_data.current_price.eur}€</p>
                                    <p class="card-text">${data.market_data.current_price.ils}₪</p>
                                    <img src="${data.image.small}" alt="${data.symbol} img">
                                </div>
                            `
                    $(this).next().append(moreInfo)
                }
            } else {
                return
            }
        })
    }




    $('#home-button').click(function (e) {
        $('#spinner-container').show();
        getData()
        $('#spinner-container').hide();
    });



























































































})