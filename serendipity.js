const usersCard = document.querySelector('.card-grid');
async function getData() {
    try {        
        const url = `https://randomuser.me/api/?results=20`;
        const response = await fetch(url);
        const result = await response.json();
        if (!response.ok) {
            throw new Error(`請求失敗：${response.status}`);
        }
        const data = result.results;
        let renderData = '';
        // render data
        data.forEach(user => {
            const avatarURL = user.picture.large;
            const name = user.name.first + ' ' + user.name.last;
            const gender = user.gender;
            const birth = user.dob.date.split('T')[0];
            const email = user.email;
            renderData += `
                <div class="card">
                    <div class="user-wrapper">
                         <div class="avatar">
                            <img src=${avatarURL} alt="">
                        </div>
                        <div class="user-description">
                            <h2>${name}</h2>
                            <p>${gender} ${birth}</p> 
                            
                            <p>${email}</p>
                        </div>    
                    </div>                
                </div>
            `;
        });        
        usersCard.innerHTML = renderData;
    } catch (error) {
        console.error('錯誤：', error);
    }
}
getData();