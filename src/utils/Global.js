
category = [
    {
        id: 101,
        type: 'Bookshops',
        attributes: {
            title: 'Book',
            description: 'A general book shop',
        }
    },
    {
        id: 102,
        type: 'FlowerShop',
        attributes: {
            title: 'Flower',
            description: 'A general Flower shop',
        }
    },
    {
        id: 103,
        type: 'medicineShop',
        attributes: {
            title: 'Medicine',
            description: 'A general Medicine shop',
        }
    }
],


coordinates =  [
    {
        id: 1,
        type: 'Bookshops',
        attributes: {
            name: 'John Book Shop',
            category_id: 101,
            opens_at: '10:00 AM',
            closes_at: '07:00 PM',
            coordinates: {
                latitude: 37.8025259,
                longitude: -122.4351431,
            }
        }
    },
    {
        id: 2,
        type: 'FlowerShop',
        attributes: {
            name: 'Rey FlowerShop Shop',
            category_id: 102,
            opens_at: '10:00 AM',
            closes_at: '07:00 PM',
            coordinates: {
                latitude: 37.7896386,
                longitude: -122.421646,
            }
        }
    },
    {
        id: 3,
        type: 'Bookshops',
        attributes: {
            name: 'Doe Book Shop',
            category_id: 101,
            opens_at: '10:00 AM',
            closes_at: '07:00 PM',
            coordinates: {
                latitude: 37.7665248,
                longitude: -122.4161628,
            }
        }
    },
    {
        id: 4,
        type: 'FlowerShop',
        attributes: {
            name: 'Dep Flower Shop',
            category_id: 102,
            opens_at: '10:00 AM',
            closes_at: '07:00 PM',
            coordinates: {
                latitude: 37.7948605,
                longitude: -122.4596065,
            }
        }
    },
    {
        id: 5,
        type: 'FlowerShop',
        attributes: {
            name: 'Jain Flower Shop',
            category_id: 102,
            opens_at: '10:00 AM',
            closes_at: '07:00 PM',
            coordinates: {
                latitude: 37.802525,
                longitude: -122.4796065,
            }
        }
    },
    {
        id: 6,
        type: 'Bookshops',
        attributes: {
            name: 'Abb Book Shop',
            category_id: 101,
            opens_at: '10:00 AM',
            closes_at: '07:00 PM',
            coordinates: {
                latitude: 37.8025259,
                longitude: -122.4596065,
            }
        }
    },
    {
        id: 7,
        type: 'MedicineShop',
        attributes: {
            name: 'Rey MedicineShop Shop',
            category_id: 103,
            opens_at: '10:00 AM',
            closes_at: '07:00 PM',
            coordinates: {
                latitude: 37.729386,
                longitude: -122.421646,
            }
        }
    },
    {
        id: 8,
        type: 'MedicineShop',
        attributes: {
            name: '24*7 MedicineShop Shop',
            category_id: 103,
            opens_at: '10:00 AM',
            closes_at: '07:00 PM',
            coordinates: {
                latitude: 37.729386,
                longitude: -122.4596065,
            }
        }
    },
    {
        id: 8,
        type: 'MedicineShop',
        attributes: {
            name: 'All in one MedicineShop Shop',
            category_id: 103,
            opens_at: '10:00 AM',
            closes_at: '07:00 PM',
            coordinates: {
                latitude: 37.779386,
                longitude: -122.4594065,
            }
        }
    },

]

export default {
    category,coordinates
}