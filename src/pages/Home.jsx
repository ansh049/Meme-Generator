import React, {useEffect, useState} from 'react';
import MemeCard from '../compoenents/Card';
import { getAllMemes } from '../api/memes';
import './Home.css';

const HomePage=()=>{
    const [data, setData]=useState([]);
    useEffect(() => {
        getAllMemes().then((memes)=>setData(memes.data.memes));
    }, []);
    return (
        <main className="home-page">
            <section className="home-hero">
                <p className="hero-eyebrow">YOUR NEXT BIG LAUGH STARTS HERE</p>
                <h1>Make a meme.<br /><span>Make someone’s day.</span></h1>
                <p className="hero-description">
                    Pick a classic, add your twist, and share the laugh. Your next viral moment is only a caption away.
                </p>
                <a className="hero-cta" href="#meme-templates">
                    Explore templates <span aria-hidden="true">↓</span>
                </a>
                <div className="hero-decoration hero-decoration-one" aria-hidden="true">😂</div>
                <div className="hero-decoration hero-decoration-two" aria-hidden="true">✨</div>
            </section>

            <section className="template-section" id="meme-templates">
                <div className="section-heading">
                    <div>
                        <p className="section-eyebrow">THE STARTING LINEUP</p>
                        <h2>Pick your meme</h2>
                    </div>
                    <span className="template-count">{data.length} templates</span>
                </div>
                <div className="meme-grid">
                    {data.map((el)=>(
                        <MemeCard key={el.id} img={el.url} title={el.name}/>
                    ))}
                </div>
            </section>
        </main>
    );
};

export default HomePage;