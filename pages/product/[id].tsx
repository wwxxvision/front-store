import {
    fetchChildTopCategories,
    fetchTopCategories
} from "../../client/fetch";
import {getCrumbs, getImageSrcById, getParentCategory, isSale} from "../../client/shop/functions";
import {
    useSubscribeProductOnCart,
    useSubscribeOnProductVariations
} from "../../client/subscribe";
import fetchProduct from "../../client/fetch/fetchProduct";
import fetchProductVariants from "../../client/fetch/fetchProductVariants";

import Head from 'next/head'
import {Header} from "../../layouts";
import {VariantsList} from "../../containers";
import {BreadCrumb, Button, ImageGallery} from "../../components";
import Image from 'next/image';
import {removeHTML} from "../../client/utils";


export default function Catalog({topCategories, childTopCategoriesList, category, product, allCategories, variants}) {
    const [variant, attributesVariant, activeGalleryImage, updateActiveGalleryImage] = useSubscribeOnProductVariations(variants, product.attributes, product.images);
    const [putProductInCart, productIsAlreadyInCart] = useSubscribeProductOnCart(variant, product);

    return <>
        <Head>
            <title>{product.name}</title>
            <link rel="icon" href="/favicon.ico"/>
            <link rel="preconnect" href="https://fonts.gstatic.com"/>
            <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600&display=swap"
                  rel="stylesheet"/>
        </Head>
        <Header topCategories={topCategories} childTopCategoriesList={childTopCategoriesList}/>
        <section className="page-product">
            <div className="block">
                <div className="wrapper">
                    <div className="product">
                        <BreadCrumb breadcrumb={getCrumbs(category, allCategories, product)}/>
                        <h1 className="product__title">{product.name}</h1>
                        <div className="product__price">
                        <span className="new">
                            {variant.price} руб
                        </span>
                            {isSale(variant.sale_price) && <span className="old">{variant.regular_price} руб</span>}
                        </div>

                        <div className="product__description">
                            {removeHTML(product.short_description)}
                        </div>

                        <VariantsList variants={attributesVariant}/>

                        <div className="product__gallery">
                            <ImageGallery  activeGalleryImage={activeGalleryImage} updateActiveGalleryImage={updateActiveGalleryImage} images={product.images} />
                        </div>

                        <div className="product__tabs">
                            <Button clickAction={putProductInCart} title={productIsAlreadyInCart() ? "Товар добавлен в корзину" : "Добавить в корзину"} state={productIsAlreadyInCart() ? "disable": "active"}/>
                            {/*<div className="like-button">*/}
                            {/*    <input className="like-button__input" type="checkbox"/>*/}
                            {/*    <div className="like-button__svg">*/}
                            {/*        <svg width="20" height="18" viewBox="0 0 20 18" fill="none"*/}
                            {/*             xmlns="http://www.w3.org/2000/svg">*/}
                            {/*            <path*/}
                            {/*                d="M9.99997 3.72893L9.38987 2.87548C9.05305 2.40432 8.67614 2.00789 8.26729 1.68806L8.26725 1.68803C7.46519 1.06051 6.56975 0.75 5.58701 0.75C4.25235 0.75 3.03323 1.28759 2.14083 2.26668L9.99997 3.72893ZM9.99997 3.72893L10.6101 2.87551M9.99997 3.72893L10.6101 2.87551M10.6101 2.87551C10.9471 2.40416 11.3239 2.00784 11.7326 1.68798C12.5349 1.06048 13.4303 0.75 14.413 0.75C15.7476 0.75 16.9666 1.28759 17.8591 2.26672L10.6101 2.87551ZM17.8591 2.26675C18.744 3.23775 19.25 4.58567 19.25 6.08016C19.25 7.57859 18.7078 8.98229 17.4364 10.5341L17.4363 10.5342C16.2759 11.9507 14.593 13.4046 12.5616 15.1558L12.5615 15.1558L12.5436 15.1713C11.86 15.7607 11.0827 16.4309 10.2759 17.1447L10.2755 17.145C10.1986 17.2131 10.1007 17.25 10 17.25C9.89932 17.25 9.80156 17.2133 9.72422 17.1448L9.72372 17.1443C8.91092 16.4254 8.12856 15.7509 7.44154 15.1586L7.4389 15.1563L7.43886 15.1562C5.40717 13.4048 3.72427 11.9507 2.56382 10.5343C1.29235 8.98225 0.75 7.57854 0.75 6.08032C0.75 4.58568 1.25602 3.23776 2.14077 2.26675H17.8591Z"*/}
                            {/*                stroke="#7A7A7A" strokeWidth="1.5"/>*/}
                            {/*        </svg>*/}

                            {/*    </div>*/}
                            {/*</div>*/}
                        </div>

                    </div>
                </div>
            </div>
            <div className="block active-slide">
                <Image src={getImageSrcById(activeGalleryImage, product.images)} layout="fill" objectFit="cover"  />
            </div>
        </section>
    </>
}


export async function getServerSideProps({params}) {
    const topCategories = await fetchTopCategories();
    const childTopCategoriesList = await fetchChildTopCategories(topCategories);
    const allCategories = [...childTopCategoriesList, ...topCategories];
    let product = await fetchProduct(params.id);
    product = product[0];

    const currentCategory = getParentCategory(product.categories[product.categories.length - 1].id, allCategories);
    const variants = await fetchProductVariants(params.id);

    return {
        props: {
            topCategories: topCategories,
            childTopCategoriesList,
            category: currentCategory,
            allCategories,
            variants,
            product
        }
    }
}
