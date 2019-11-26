
export default {
    getMove: (apiMappedBoard, piece) => {
        return fetch("https://stujo-tic-tac-toe-stujo-v1.p.rapidapi.com/"
            + apiMappedBoard + "/" + piece,
            {
                headers: {
                    "x-rapidapi-host": "stujo-tic-tac-toe-stujo-v1.p.rapidapi.com",
                    "x-rapidapi-key": "b2cedb2035mshd68e2eb42d85778p13925djsn78f588dc088f"
                }
            })
            .then((response) => response.json());
    }
}