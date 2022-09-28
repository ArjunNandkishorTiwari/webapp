

const healthGet = (req,res) => {
    res.set('Content-Type', 'application/json')
    res.status(200).send();

}

module.exports = {
    healthGet
}