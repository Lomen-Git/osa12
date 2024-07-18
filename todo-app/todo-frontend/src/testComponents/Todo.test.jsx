import React from "react";
import { render, screen } from '@testing-library/react';
import Todo from "./Todo";
import { describe, expect } from "vitest";


describe('Testi', () => {
    const text = "Hieno testi"
    test('Näkyykö teksti', () => {

        render(<Todo text={text}/>);
        expect(screen.getByText(text)).toBeInTheDocument();
        
    });
});