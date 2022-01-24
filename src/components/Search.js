import React, {useState, useEffect} from 'react';
import axios from 'axios';

export default () => {
    const [term, setTerm] = useState('programming');
    const [results, setResults] = useState([]);

    // useEffect() second argument: dependency list
    // nothing: run at initial and after every rerender
    // []: run at initial render
    // [y]: run at initial render and after every rerender(if y has changed)
    useEffect(() => {
        const wikiService = async () => {
            const { data } = await axios.get('https://en.wikipedia.org/w/api.php', {
                params: {
                    action: 'query',
                    list: 'search',
                    origin: '*',
                    format: 'json',
                    srsearch: term
                }
            });

            setResults(data.query.search);
        };

        if (term && !results.length) {
            wikiService();
        }

        const timeoutId = setTimeout(() => {
            if (term) {
                wikiService();            
            }
        }, 1000);

        // Cleanup function
        return () => {
            clearTimeout(timeoutId);
        }

    }, [term]);

    const renderedResults = results.map((result) => {
        return (
            <div key={result.pageid} className='item'>
                <div className='right floated content'>
                    <a 
                        href={`https://en.wikipedia.org?curid=${result.pageid}`} 
                        className='ui button'>
                        Go
                    </a>
                </div>
                <div className='content'>
                    <div className='header'>
                        {result.title}
                    </div>
                    <span dangerouslySetInnerHTML={{__html: result.snippet}} />
                </div>
            </div>
        );
    });

    return (
        <div>
            <div className='ui form'>
                <div className='field'>
                    <label>Arama metni giriniz:</label>
                    <input value={term} onChange={e => setTerm(e.target.value)} className='input' type="text" />
                </div>
            </div>
            <div className='ui celled list'>
                {renderedResults}
            </div>
        </div>
    );
}