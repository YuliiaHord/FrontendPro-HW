export class View {

    clearContent(el) {
        if (!el && el.nodeType !== 1) return;
        while (el.firstChild) {
            el.removeChild(el.firstChild);
        }
    }

    createEl({type, attributes, text}) {
        const el = document.createElement(type);
        if (attributes) {
            for (const [key, value] of Object.entries(attributes)) {
                el.setAttribute(key, value);
            }
        }
        if (text) {
            el.textContent = text;
        }
        return el;
    }

    createCol(className) {
        const col = this.createEl({type: "div", attributes: {class: `${className}`}});
        return col;
    }

    createListItem({icoClass, text, info}) {
        const lisItem = this.createEl({type: "li",
            attributes: {
                class: `list-group-item d-flex py-0 px-3 text-light`,
                style: "background: transparent; border: none; line-height: 1;"
            }
        });
        const lisItemIco = this.createEl({type: "i", attributes: {class: icoClass}});
        const lisItemText = this.createEl({type: "p", text: `${text}: `});
        const lisItemSpan = this.createEl({type: "span", attributes: {class: "fw-semibold ps-1"}, text: `${info}`});
        lisItem.append(lisItemIco);
        lisItemText.append(lisItemSpan);
        lisItem.append(lisItemText);
        return lisItem;
    }

    createForm() {
        const searchCol = this.createEl({type: "div", attributes: {class: "col-3 pe-0"}});
        const form = this.createEl({type: "form", attributes: {class: "selection-form d-flex", name: "selectForm"}});
        const label = this.createEl({type: "label", attributes: {class: "label", for: "citySearch"}});
        const input = this.createEl({
            type: "input",
            attributes: {
                class: "form-control text-light custom-input",
                id: "citySearch",
                name: "citySearch",
                placeholder: "search for city...",
                style: "background: transparent; outline: none; border: none; border-radius: 0;"
            }
        });
        const searchBtn = this.createEl({type: "button", attributes: {class: "btn"}});
        const searchIco = this.createEl({type: "i", attributes: {class: "bi bi-search text-light"}});
        form.append(label);
        form.append(input);
        searchBtn.append(searchIco);
        form.append(searchBtn);
        searchCol.append(form);
        return searchCol;
    }

    createGeoChoice() {
        const geoCol = this.createEl({type: "div", attributes: {class: "col-1 px-0"}});
        const geoBtn = this.createEl({type: "button", attributes: {class: "btn"}});
        const geoIco = this.createEl({type: "i", attributes: {class: "bi bi-geo-alt text-light"}});

        geoBtn.append(geoIco);
        geoCol.append(geoBtn);

        return geoCol;
    }

    createDegreeChoice() {
        const temperatureCol = this.createEl({type: "div", attributes: {class: "col-1 px-0"}});
        const celsiusBtn = this.createEl({
            type: "button",
            attributes: {
                type: "button",
                class: "btn  border-end text-light",
                "data-temperature": "C",
                style: "border-radius: 0"
            },
            text: "°C"
        });
        const fahrenheitBtn = this.createEl({
            type: "button",
            attributes: {
                type: "button",
                style: "border-radius: 0; outline: 0",
                class: "btn text-light",
                "data-temperature": "F"
            },
            text: "°F"
        });
        temperatureCol.append(celsiusBtn);
        temperatureCol.append(fahrenheitBtn);
        return temperatureCol;
    }

    createForecastRow(type, objectForecast, units) {
        const context = (type === "hourly") ? "Hourly Forecast" : "Daily Forecast";
        const row = this.createEl({type: "div", attributes: {class: "row mb-3 mx-auto", style: "width: 65%;"}});
        const title = this.createEl({type: "h5",
            attributes: {
                class: "forecast-title text-uppercase fw-semibold pb-3 w-90",
                style: "border-bottom: 2px solid white"
            },
            text: context
        });
        const forecast = this.createEl({type: "div", attributes: {class: "forecast d-flex justify-content-between"}});
        const forecastFragment = document.createDocumentFragment();
        if (type === "hourly") {
            for (let i = 0; i < 5; i++) {
                const col = this.createCol("col-2 text-center pe-3");
                const time = this.createEl({
                    type: "p",
                    attributes: {class: "hour-time mb-0"},
                    text: `${this.getDateTime("time", new Date(objectForecast.list[i].dt * 1000)).toUpperCase()}`
                });
                const icon = this.createEl({
                    type: "img",
                    attributes: {src: `https://openweathermap.org/img/wn/${objectForecast.list[i].weather["0"].icon}@2x.png`}
                });
                const temperature = this.createEl({
                    type: "p",
                    attributes: {class: "hour-temperature"},
                    text: `${Number(objectForecast.list[i].main.temp).toFixed(0)} °${(units === "imperial") ? "F" : "C"}`
                });
                col.append(time);
                col.append(icon);
                col.append(temperature);
                forecastFragment.append(col);
            }
        }

        if (type === "daily") {
            const filteredArr = objectForecast.list.filter((el) => {
                return el["dt_txt"].includes("12:00:00");
            })
            for (let i = 0; i < filteredArr.length; i++) {
                const col = this.createCol("col-2 text-center pe-3");
                const day = this.createEl({
                    type: "p",
                    attributes: {class: "day-time mb-0"},
                    text: `${this.getDateTime("dayOfWeek", new Date(filteredArr[i].dt_txt))}`
                });
                col.append(day);
                const icon = this.createEl({
                    type: "img",
                    attributes: {src: `https://openweathermap.org/img/wn/${filteredArr[i].weather["0"].icon}@2x.png`}
                });
                const temperature = this.createEl({
                    type: "p", attributes: {class: "day-temperature"}, text: `${Number(filteredArr[i].main.temp).toFixed(0)} °${(units === "imperial")? "F" : "C"}`
                });
                col.append(day);
                col.append(icon);
                col.append(temperature);
                forecastFragment.append(col);
            }
        }
        forecast.append(forecastFragment);
        row.append(title);
        row.append(forecast);
        return row;
    }

    createNotification(userCity) {
        const message = this.createEl({type: "div"});
        const title = this.createEl({
            type: "h1",
            attributes: {class: "text-center mt-5 mb-2 mx-auto w-50"},
            text: `Sorry, we haven't found your city "${userCity}".`
        });
        const img = this.createEl({
            type: "img",
            attributes: {class: "d-block mx-auto", src: "./images/error.png", width: "500", height: "500"}
        });
        message.append(title);
        message.append(img);
        return message;
    }

    capitalize(string){
        const firstLetter = string.charAt(0).toUpperCase();
        const rest = string.slice(1).toLowerCase();
        return firstLetter+rest;
    }
    getDateTime(type, dateObject) {
        let options;
        if (type === "date") {
            options = {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            };
        } else if (type === "time") {
            options = {
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
            };
        } else if (type === "dayOfWeek") {
            options = {
                weekday: 'short',
            };
        } else {
            return;
        }

        const formatter = new Intl.DateTimeFormat('en-GB', options);
        const formattedDate = formatter.format(dateObject);

        return String(formattedDate);
    }
}

