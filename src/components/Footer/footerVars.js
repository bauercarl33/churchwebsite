import { FaPhoneAlt, FaFax, FaFacebook, FaInstagram, FaEnvelope, FaTruck } from 'react-icons/fa'
import { FaLocationDot } from 'react-icons/fa6'

export const footerLinks = {
    churchLocation: {
        link: 'https://maps.app.goo.gl/fZGhZrtWCDrdrJtY7',
        label: 'Map of church location',
        icon: <FaLocationDot size={24} className='icon' />,
        bold: 'bold',
        boldContent: "Address:",
        content: "200 Monaco Dr., Cedar Park, TX 78613"
    },
    phone: {
        link: 'tel: 7374004458',
        label: 'Call us',
        icon: <FaPhoneAlt size={24} className='icon' />,
        bold: 'no-bold',
        boldContent: "",
        content: "(737) 400-4458"
    },
    mail: {
        link: 'mailto: church@saintmaryaustin.org',
        label: 'Call us',
        icon: <FaEnvelope size={24} className='icon' />,
        bold: 'no-bold',
        boldContent: "",
        content: "church@saintmaryaustin.org"
    },
}

export const pageLinks = {
    home: {
        name: 'Home',
        link: '/',
        label: 'Go to home page'
    },
    about: {
        name: 'About',
        link: '/about',
        label: 'Go to about page'
    },
    calendar: {
        name: 'Calendar',
        link: '/calendar',
        label: 'Go to calendar page'
    },
}

export const socialLinks = {
    facebook: {
        link: 'https://www.facebook.com/saintmaryaustin/',
        icon: <FaFacebook size={32} className='icon'/>,
        label: "Go to Facebook page"
    },
    instagram: {
        link: 'https://www.instagram.com/saintmaryaustin/',
        icon: <FaInstagram size={32} className='icon'/>,
        label: "Go to Instagram page"
    }
}