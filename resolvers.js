const Query = {
    listings: async (root, {filter}, {dataSources}) => {
        return await dataSources.simplyRETSAPI.getAllListings(filter)
    }
}

module.exports = { Query }