const domain= import.meta.env.WP_DOMAIN
const apiURL = `${domain}/wp-json/wp/v2`


export const getPageInfo = async (slug:string) => {
    const response = await fetch(`${apiURL}/pages?slug=${slug}`)

    if(!response.ok){
        throw new Error("Failded to fetch page info");
    }

    const [data] = await response.json()
    const {title: {rendered: title}, content: {rendered: content}} = data;
    return {title, content}
}

export const getLatestPost = async({perPage = 10}: {perPage?: number} = {}) =>{
    const response = await fetch (`${apiURL}/products?per_page=${perPage}&_embed`)

    if(!response.ok){
        throw new Error("Failded to fetch Latest Posts");
    }

    const results = await response.json();
    if(!results.length){
        throw new Error("No posts found")
    }

    const posts = results.map(post =>{
        // const {
        // title: {rendered: title}, 
        // excerpt: {rendered: excerpt},
        // content: {rendered: content},
        // date,
        // slug
    
        // } = post;

        const title= post.title.rendered;
        const excerpt = post.excerpt.rendered;
        const content = post.content.rendered;
        const {date, slug} = post;
        const featuredImage = post._embedded['wp:featuredmedia'][0].source_url;
        return {title, excerpt, content, date, slug, featuredImage}
    })

    return posts;


}

export const getProductInfo = async(slug: string) =>{
    const response = await fetch(`${apiURL}/products?slug=${slug}`);
    if (!response.ok){
        throw new Error("Failed to fetch all products");
    }
   

    const [data] = await response.json()

        const titulo= data.acf.titulo;
        const descripcion = data.acf.descripcion;
        const ano = data.acf.ano;
        const categoria = data.acf.categoria;
        const modelo = data.acf.modelo;
        const marca = data.acf.marca;
        const precio = data.acf.precio;
        const precioOferta = data.acf.precio_oferta;

        const imagen = data.acf.imagen;

        const especificaciones = Object.entries(data.acf.especificaciones)
        const galeria = Object.values(data.acf.galeria)

        return {titulo, slug, descripcion, ano, categoria, modelo, marca, precio, precioOferta,imagen, especificaciones,galeria}
}


export const getAllProductsSlugs = async()=>{
    const response = await fetch(`${apiURL}/products?per_page=100`)
    if(!response){
        throw new Error("Failed to fetch all products")
    }

    const results = await response.json();
    if(!results.length){
        throw new Error("No products found");
    }

    const slugs = results.map((product) => product.slug)
    return slugs;
}



export const getLatestProducts = async({perPage = 10}: {perPage?: number} = {}) =>{
    const response = await fetch (`${apiURL}/products?per_page=${perPage}&_embed`)

    if(!response.ok){
        throw new Error("Failded to fetch Latest Posts");
    }

    const results = await response.json();
    if(!results.length){
        throw new Error("No posts found")
    }

    const products = results.map(product =>{
        
        const titulo= product.acf.titulo;
        const {date, slug} = product;
        const ano = product.acf.ano;
        const modelo = product.acf.modelo;
        const marca = product.acf.marca;
        const precio = product.acf.precio;
        const precioOferta = product.acf.precio_oferta;
        const imagen = product.acf.imagen;
        return {titulo, date, slug, ano, modelo, marca, precio, precioOferta, imagen}
    })

    return products;

}

export const getRelatedProducts = async (categoria: string, currentSlug: string) => {
  const response = await fetch(`${apiURL}/products?categoria=${categoria}&per_page=10`);

  if (!response.ok) {
    throw new Error("Failed to fetch Related products");
  }

  const results = await response.json();

  if (!results.length) {
    throw new Error("No products found");
  }

  const filtered = results.filter((product) => product.slug !== currentSlug).slice(0, 4);

  const products = filtered.map(product => {
    const titulo = product.acf.titulo;
    const { date, slug } = product;
    const ano = product.acf.ano;
    const modelo = product.acf.modelo;
    const marca = product.acf.marca;
    const precio = product.acf.precio;
    const precioOferta = product.acf.precio_oferta;
    const imagen = product.acf.imagen;

    return { titulo, date, slug, ano, modelo, marca, precio, precioOferta, imagen };
  });

  return products;
};


export const getBannerVideo = async (slug:string) =>{
    const response = await fetch(`${apiURL}/${slug}`)

    if(!response.ok){
        throw new Error("Failded to fetch Video Banner info");
    }

    const [data] = await response.json();
    const url= data.acf.url_video;
    const portada = data.acf.portada;
    return {url, portada}
}

export const getMap = async () =>{
    const response = await fetch(`${apiURL}/mapa`)

    if(!response.ok){
        throw new Error("Failded to fetch map info");
    }

    const [data] = await response.json();
    const mapa= data.acf.mapa;
    return {mapa}
}


export const getAllSliders = async()=>{
    const response = await fetch(`${apiURL}/sliders?order=asc`)
    if(!response){
        throw new Error("Failed to fetch all sliders")
    }

    const results = await response.json();
    if(!results.length){
        throw new Error("No sliders found");
    }

    const sliders = results.map(slider => {
        const image = slider.acf.slider;
        return image;
    });
    return sliders;
}

export const getAllSocials = async()=>{
    const response = await fetch(`${apiURL}/redes?order=asc`)
    if(!response){
        throw new Error("Failed to fetch all socials")
    }

    const results = await response.json();
    if(!results.length){
        throw new Error("No socials found");
    }

    const socials = results.map(social => {
        const titulo = social.acf.titulo;
        const link = social.acf.link;
        const icono = social.acf.icono;
        return {titulo, link, icono};
    });
    return socials;
}

export const getLogo = async() =>{
    const response = await fetch(`${apiURL}/empresa`)
    if(!response){
        throw new Error("Failed to fetch Bussines info")
    }

    const result = await response.json();
    if(!result.length){
        throw new Error("No Bussines found");
    }

    return result?.[0]?.acf?.logo ?? null;
}

export const getBussinesInfo = async() =>{
    const response = await fetch(`${apiURL}/empresa?slug=empresa`);

    if (!response.ok){
        throw new Error("Failed to fetch all products");
    }
   

        const [data] = await response.json()
        const logo = data.acf.logo;
        const nombre= data.acf.nombre;
        const descripcion= data.acf.descripcion;
        const keywords = data.acf.keywords;
        const telefono_principal = data.acf.telefono_principal;
        const telefono_secundario = data.acf.telefono_secundario;
        const email_principal = data.acf.email_principal;
        const email_secundariio = data.acf.email_secundariio;
        const direccion_web = data.acf.direccion_web;
        const horario_atencion = data.acf.horario_atencion;

        return {logo,nombre,descripcion, keywords, telefono_principal, telefono_secundario, email_principal, email_secundariio, direccion_web, horario_atencion}
}

export const getAllBranches = async()=>{
    const response = await fetch(`${apiURL}/sucursal`)
    if(!response){
        throw new Error("Failed to fetch all branches")
    }

    const results = await response.json();
    if(!results.length){
        throw new Error("No branches found");
    }

    const branches = results.map(branch => {
        const titulo = branch.acf.titulo;
        const direccion = branch.acf.direccion;
        const telefono = branch.acf.telefono;
        return {titulo, direccion, telefono};
    });
    return branches;
}