import axios from "axios"
export async function getTagsList() {
    return new Promise((resolve) => {
        var tagsList = []
        axios
            .get(`https://func-rizuguru.azurewebsites.net/api/GetTag?`)
            .then((res) => {
                tagsList = res.data
                    .filter((tag) => tag.id > 10)
                    .map((tag) => {
                        tag.state = false;
                        return tag;
                    });
                resolve(Promise.all(tagsList));
            });

    })
}