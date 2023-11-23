const myLoader = document.getElementById('spinner-div');
const myBreadCrumb = document.getElementById('ol-breadcrumb');
const myNavbar = document.getElementById('stickyNavbar');


const DOMPageLoaded = async () => {
    myLoader.style.display = 'flex';
    myLoader.classList.add('hidden');


    // carga de la pagina
    await new Promise((resolve) => {
        // al terminar la carga, retorna el resolve para que se ejecute el callback()
        document.addEventListener('DOMContentLoaded', () => {
            let opacity = 1;
            const fadeOutInterval = setInterval(() => {
                opacity -= 0.05;
                myLoader.style.opacity = opacity;
                if (opacity <= 0) {
                    clearInterval(fadeOutInterval);
                    myLoader.style.display = 'none';
                    //myLoader.remove();
                    resolve();
                }
            }, 30);

        });
    });


    // const bodyActive = document.body.getAttribute('data-active');



    // const menuItems = myNavbar.querySelectorAll('a.nav-link');

    // menuItems.forEach(function (menuItem) {
    //     const menuItemHref = menuItem.getAttribute('href');
    //     const currentPagePath = window.location.pathname;
    //     console.log(currentPagePath, menuItemHref);
    //     if (currentPagePath.endsWith(menuItemHref)) {
    //         menuItem.classList.add('active');
    //     }
    // });


    // submenu

    //const parentDropdownToggle = submenuItem.closest('.nav-item.dropdown').querySelector('.dropdown-toggle');
    // if (parentDropdownToggle) {
    //     parentDropdownToggle.classList.add('active');
    // }
};

// breadcrumb
const setBreadCrumb = () => {

    if (myBreadCrumb != null) {
        const arrayBreadCrumb = location.href.split('/').slice(2);
        const isLastElement = arrayBreadCrumb.length - 1;

        for (const [index, breadcrumb] of arrayBreadCrumb.entries()) {
            const text = decodeURIComponent(breadcrumb).toLowerCase();
            const link = '/' + arrayBreadCrumb.slice(1, index + 1).join('/');
            if (text.length > 0) {

                const liElement = document.createElement("li");
                const aElement = document.createElement("a");

                liElement.classList.add("breadcrumb-item", "text-capitalize");
                aElement.classList.add("link-body-emphasis", "fw-semibold", "text-decoration-none");

                if (index == 0) {
                    aElement.innerHTML = '<i class="fa-solid fa-house"></i> Home';
                    aElement.href = "/";
                }
                else {
                    aElement.textContent = text.replace(/\.php|\.html/g, '');
                    aElement.href = link;
                }
                liElement.appendChild(aElement);
                myBreadCrumb.appendChild(liElement);

                if (index == isLastElement) {
                    liElement.classList.add("active");
                    liElement.removeChild(aElement);
                    liElement.textContent = text.replace(/\.php|\.html/g, '');
                }
            }
        }

    }

}
window.addEventListener('scroll', function () {
    if (window.scrollY > 100) {
        myNavbar.classList.remove('bg-dark');
        myNavbar.classList.add('navbar-scrolled');

    } else {
        myNavbar.classList.remove('navbar-scrolled');
        myNavbar.classList.add('bg-dark');
    }
});
const axiosGetData = async (
    url,
    done,
    fail,
) => {
    return new Promise(async (resolve, reject) => {
        let data = [];
        try {
            const response = await axios.get(url);
            resolve(done(response.data));
        } catch (e) {
            reject(fail(error));
        } finally {
            return data;
        }
    });
};
const axiosPostData = async (formData, url, done, fail) => {
    let data = [];
    try {
        const response = await axios.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        data = response.data;
        done(data);
    } catch (e) {
        data = e;
        fail(e);
    } finally {
        return data;
    }
}


//DOMPageLoaded().then(() => {
setBreadCrumb();
//});

