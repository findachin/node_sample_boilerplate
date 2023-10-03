function longCompute() {
    let sum = 0;
    for (let index = 0; index < 1e2; index++) {
        sum = +index;
    }
    return sum
}

process.on('message', (data) => {
    console.log({ data });
    const sum = longCompute()
    process.send(sum)
    process.exit()
})