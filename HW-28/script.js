import { View } from './view.js';


class Fetch {
    static convertUrl({basePath, path, params}) {
        const url = new URL(path, basePath);
        if (params) {
            for (const [key, value] of Object.entries(params)) {
                url.searchParams.set(key, value);
            }
        }
        return url;
    }
    constructor(url) {
        this.url = url;
        this.abortController = null;
    }
    async get({path = "", headers = {}, params = {}}) {
        this.abortController = new AbortController();
        const resp = await fetch(Fetch.convertUrl({basePath: this.url, path: path, params: params}), {
            signal: this.abortController.signal,
            ...(headers && {headers}),
        });
        if (!resp.ok) throw new Error("Oops, fetch failed.");
        return await resp.json();
    }
    get controller() {
        if (this.abortController) {
            return this.abortController;
        }
    }
}

const weatherAPI = new Fetch("http://api.openweathermap.org");
const userIP = new Fetch("https://ip.guide");

class WeatherHandler extends View{
    #userCity;
    #userCountry;
    #userLon;
    #userLat;
    #userWeather;
    #weatherAPIkey;
    #userUnits;
    #userHourForecast;
    #currentIcon;
    #mainRow;
    #root;
    constructor(weatherAPIkey) {
        super();
        this.#weatherAPIkey = weatherAPIkey;
        this.#userUnits = "metric";
    }

    async createContent() {
        try {
            await this.getWeather(this.#userCity);

            if (this.#userWeather === null || this.#userCity === "") {
                this.#mainRow = this.createEl({type: "main", attributes: {class: "page"}});
                this.#mainRow.append(this.createNotification(this.#userCity));
            } else {
                this.#mainRow = this.createMain();
            }
            this.changeBackground(this.#currentIcon);
            this.#root.append(this.#mainRow);
        } catch (error) {
            console.log(error);
        }
    }

    async getWeather(city) {
        try {
            await weatherAPI.get({
                path: `/geo/1.0/direct`,
                params: {q: city, limit: 1, appid: this.#weatherAPIkey}
            }).then((response) => {
                if (!response.length) {
                    this.clearContent(this.#mainRow);
                    this.#mainRow.append(this.createNotification(this.#userCity));
                    this.#userWeather = null;
                    throw new Error("We can't find your city!");
                }
                this.#userLat = response["0"].lat.toFixed(2);
                this.#userLon = response["0"].lon.toFixed(2);
            }).then(async () => {
                await weatherAPI.get({
                        path: "data/2.5/weather",
                        params: {
                            "lat": this.#userLat,
                            "lon": this.#userLon,
                            "appid": this.#weatherAPIkey,
                            "units": this.#userUnits,
                        }
                    }
                ).then((response) => {
                    this.#userWeather = response;
                    this.#currentIcon = this.#userWeather.weather["0"].icon;
                })
            }).then(async () => {
                await weatherAPI.get({
                    path: "data/2.5/forecast",
                    params: {
                        "lat": this.#userLat,
                        "lon": this.#userLon,
                        "appid": this.#weatherAPIkey,
                        "units": this.#userUnits,
                    }
                }).then((response) => {
                    this.#userHourForecast = response;
                })
            })
        } catch (e) {
            console.log(e)
            this.clearContent(this.#mainRow);
        }

        return this.#userWeather;
    }

    async getIP() {
        try {
            const response = await userIP.get({});
            this.#userCity = response["location"]["city"];
            this.#userCountry = response["location"]["country"];
        } catch (e) {
            console.log(e)
        }
    }

    changeBackground(icon) {
        if (icon.includes("d")) {
            document.body.style.backgroundImage = `url(./images/backgrounds/01d.jpg)`;
        } else {
            document.body.style.backgroundImage = `url(./images/backgrounds/01n.jpg)`;
        }

        document.body.style.backgroundRepeat = `no-repeat`;
        document.body.style.backgroundSize = `cover`;
        document.body.style.minHeight = `100vh`;
    }

    createBasicChoice() {
        const row = this.createEl({type: "div", attributes: {class: "row basic-cities"}});
        const basicCities = ["Kyiv", "Kharkiv", "Odesa", "Dnipro", "Lviv"];
        const citiesList = this.createEl({
            type: "ul",
            attributes: {class: "list-group d-flex flex-row flex-wrap justify-content-center p-3"}
        });
        const citiesFragment = document.createDocumentFragment();
        basicCities.forEach((el) => {
            const city = this.createEl({
                type: "li",
                attributes: {
                    class: "list-group-item mx-3 fw-semibold text-light",
                    style: "background: transparent; cursor:pointer;  border: none;",
                    ["data-city"]: el
                },
                text: el
            });
            citiesFragment.append(city);
        })

        citiesList.addEventListener("click", (event) => {
            if ("city" in event.target.dataset) {
                if (!(event.target.classList.contains("disabled"))) {
                    this.#userCity = event.target.dataset["city"];
                    event.target.classList.add("disabled");
                    this.clearContent(this.#mainRow);
                    this.#mainRow.remove();
                    this.createContent();
                }

                setTimeout(() => {
                    event.target.classList.remove("disabled");
                }, 500);
            }

        })
        citiesList.append(citiesFragment);
        row.append(citiesList);

        return row;
    }

    createSelectRow() {
        const row = this.createEl({type: "div", attributes: {class: "row form-row d-flex justify-content-center"}});
        const formCol = this.createForm();
        const geoCol = this.createGeoChoice();
        const tempCol = this.createDegreeChoice();
        row.append(formCol);
        row.append(geoCol);
        row.append(tempCol);

        formCol.firstChild.addEventListener("submit", (event) => {
            event.preventDefault();
            this.#userCity = document.forms["selectForm"]["citySearch"].value;
            document.forms["selectForm"]["citySearch"].value = "";
            this.#mainRow.remove();
            this.createContent();
        });
        const geoBtn = geoCol.firstChild;
        geoBtn.firstChild.addEventListener("click", (event) => {
            if (event.target.tagName === "I") {
                this.#mainRow.remove();
                this.getIP().then(async () => {
                    await this.createContent();
                });
            }
        });
        tempCol.addEventListener("click", (event) => {
            if ("temperature" in event.target.dataset) {
                event.target.disabled = true;
                if (event.target.dataset["temperature"] === "C") {
                    this.#userUnits = "metric";
                    this.#mainRow.remove();
                    this.createContent();
                }
                if (event.target.dataset["temperature"] === "F") {
                    this.#userUnits = "imperial";
                    this.#mainRow.remove();
                    this.createContent();
                }
                setTimeout(() => {
                    event.target.disabled = false;
                }, 500);
            }
        })
        return row;
    }

    createDateTimeRow() {
        const row = this.createEl({type: "div", attributes: {class: "row"}});
        const h2 = this.createEl({
            type: "h2",
            attributes: {class: "dateTimeRow fs-5 fw-light pt-3 text-center"},
            text: `${this.getDateTime("date", new Date())} | Local time: ${this.getDateTime("time", new Date()).toUpperCase()}`
        });
        row.append(h2);
        return row;
    }

    createCityRow() {
        const rowCityTitle = this.createEl({type: "div", attributes: {class: "row rowCityTitle"}});
        const city = this.createEl({
            type: "h1",
            attributes: {class: "fs-3 text-center m-3 p-0"},
            text: `${this.capitalize(this.#userCity)}, ${this.#userWeather.sys.country}`
        });
        rowCityTitle.append(city);
        return rowCityTitle;
    }

    createWeatherTitleRow() {
        const rowWeatherTitle = this.createEl({type: "div", attributes: {class: "row rowWeatherTitle"}});
        const weatherTitle = this.createEl({
            type: "h3",
            attributes: {class: "fs-5 fw-normal text-center m-4 p-0"},
            text: `${this.#userWeather.weather["0"].main}`
        });
        rowWeatherTitle.append(weatherTitle);

        return rowWeatherTitle;
    }

    createAdditionalInfoList() {
        const additionalList = this.createEl({type: "ul", attributes: {class: "list-group"}});
        additionalList.append(this.createListItem({
            icoClass: "bi bi-thermometer-half pe-2",
            text: "Real feel",
            info: `${this.#userWeather.main.feels_like} °${(this.#userUnits === "imperial") ? "F" : "C"}`
        }));
        additionalList.append(this.createListItem({
            icoClass: "bi bi-droplet-half pe-2",
            text: "Humidity",
            info: `${this.#userWeather.main.humidity}%`
        }));
        additionalList.append(this.createListItem({
            icoClass: "bi bi-wind pe-2",
            text: "Wind",
            info: `${this.#userWeather.wind.speed}km/h`
        }));
        return additionalList;
    }

    createDescriptionRow() {
        const descriptionRow = this.createEl({
            type: "div",
            attributes: {class: "row descriptionRow justify-content-center align-items-center mb-3"}
        });
        const descriptionFragment = document.createDocumentFragment();

        const iconCol = this.createCol("col-2 ps-2");
        const icon = this.createEl({
            type: "img",
            attributes: {src: `https://openweathermap.org/img/wn/${this.#currentIcon}@2x.png`}
        })

        const temperatureCol = this.createCol("col-4");
        const temperature = this.createEl({
            type: "h2",
            attributes: {class: "text-center fs-1"},
            text: `${Number(this.#userWeather.main.temp).toFixed(0)} ${(this.#userUnits === "metric") ? "°C" : "°F"}`
        });

        const additionalCol = this.createCol("col-2");
        const additionalInfoList = this.createAdditionalInfoList();

        iconCol.append(icon);
        temperatureCol.append(temperature);
        additionalCol.append(additionalInfoList);

        descriptionFragment.append(iconCol);
        descriptionFragment.append(temperatureCol);
        descriptionFragment.append(additionalCol);

        descriptionRow.append(descriptionFragment);
        return descriptionRow;
    }

    createPositionOfSunRow() {
        const positionOfSunRow = this.createEl({type: "div", attributes: {class: "row positionOfSunRow pt-3 pb-5"}});
        const positionOfSunList = this.createEl({
            type: "ul",
            attributes: {class: "list-group d-flex flex-row justify-content-center align-items-center"}
        });
        positionOfSunList.append(this.createListItem({
            icoClass: "bi bi-sunrise pe-1",
            text: "Rise",
            info: `${this.getDateTime("time", new Date(this.#userWeather.sys.sunrise * 1000)).toUpperCase()}`
        }));
        positionOfSunList.append(this.createListItem({
            icoClass: "bi bi-sunset pe-1",
            text: "Set",
            info: `${this.getDateTime("time", new Date(this.#userWeather.sys.sunset * 1000)).toUpperCase()}`
        }));
        positionOfSunList.append(this.createListItem({
            icoClass: "bi bi-brightness-high pe-1",
            text: "High",
            info: `${this.#userWeather.main.temp_min} °${(this.#userUnits === "imperial") ? "F" : "C"}`
        }));
        positionOfSunList.append(this.createListItem({
            icoClass: "bi bi-brightness-low pe-1",
            text: "Low",
            info: `${this.#userWeather.main.temp_max} °${(this.#userUnits === "imperial") ? "F" : "C"}`
        }));
        positionOfSunRow.append(positionOfSunList);
        return positionOfSunRow;
    }

    createHeader() {
        const header = this.createEl({type: "header", attributes: {class: "header"}});
        header.append(this.createBasicChoice());
        header.append(this.createSelectRow());
        header.append(this.createDateTimeRow());
        return header;
    }

    createMain() {
        const main = this.createEl({type: "main", attributes: {class: "page"}});
        main.append(this.createCityRow());
        main.append(this.createWeatherTitleRow());
        main.append(this.createDescriptionRow());
        main.append(this.createPositionOfSunRow());
        main.append(this.createForecastRow("hourly", this.#userHourForecast, this.#userUnits));
        main.append(this.createForecastRow("daily", this.#userHourForecast, this.#userUnits));
        return main;
    }

    init() {
        document.body.style.color = `white`;
        this.#root = this.createEl({type: "div", attributes: {class: "container-md"}});
        this.#root.append(this.createHeader());
        document.body.insertAdjacentElement("afterbegin", this.#root);
        this.getIP().then(async () => {
            await this.createContent();
        });
    }
}

const APIKey = prompt("Please, enter your API-key:");
new WeatherHandler(APIKey).init();

