const Filters = {
    filterSport(posts, sport) {
        if (sport !== 'Sport') {
            const filtered = posts.filter(post => {
                return post.sport === sport.toLowerCase()
            })
            return filtered
        } else {
            return posts
        }
    },
    filterLocation(posts, location) {
        if (location) {
            const filtered = posts.filter(post => {
                return post.spot_address.toLowerCase().includes(location.toLowerCase())
            })
            return filtered
        } else {
            return posts
        }
    },
    filterDifficulty(posts, difficulty) {
        if (difficulty !== 'Difficulty') {
            const filtered = posts.filter(post => {
                return post.difficulty === difficulty
            })
            return filtered
        } else {
            return posts
        }
    },
    filterSecurity(posts, security) {
        if (security !== 'Security') {
            const filtered = posts.filter(post => {
                return post.security_level === security
            })
            return filtered
        } else {
            return posts
        }
    },
}

export default Filters