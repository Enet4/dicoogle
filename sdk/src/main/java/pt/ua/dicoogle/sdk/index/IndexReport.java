/**
 * Copyright (C) 2014  Universidade de Aveiro, DETI/IEETA, Bioinformatics Group - http://bioinformatics.ua.pt/
 *
 * This file is part of Dicoogle/dicoogle-sdk.
 *
 * Dicoogle/dicoogle-sdk is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Dicoogle/dicoogle-sdk is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Dicoogle.  If not, see <http://www.gnu.org/licenses/>.
 */
package pt.ua.dicoogle.sdk.index;

import java.util.Objects;

public final class IndexReport extends pt.ua.dicoogle.sdk.datastructs.IndexReport {
    private int nErrors;
    private int nIndexed;
    private int nIgnored;
    private long timeStarted;
    private long timeFinished;
    
    public long getTimeStarted() {
        return this.timeStarted;
    }

    public long getTimeFinished() {
        return this.timeFinished;
    }

    @Override
	public long getElapsedTime() {
		return this.timeFinished - this.timeStarted;
	}
	@Override
	public int getNErrors() {
		return this.nErrors;
	}
	@Override
	public int getNIndexed() {
		return this.nIndexed;
    }

    public int getNIgnored() {
        return this.nIgnored;
    }
    
    public void mergeWith(IndexReport other) {
        this.nErrors += other.nErrors;
        this.nIgnored += other.nIgnored;
        this.nIndexed += other.nIndexed;
        this.timeStarted = Long.min(this.timeStarted, other.timeStarted);
        this.timeFinished = Long.max(this.timeFinished, other.timeFinished);
    }

    public boolean equals(IndexReport other) {
        return this.nErrors == other.nErrors
            && this.nIgnored == other.nIgnored
            && this.nIndexed == other.nIndexed
            && this.timeStarted == other.timeStarted
            && this.timeFinished == other.timeFinished;
    }

    @Override
    public boolean equals(Object other) {
        if (this == other) return true;
        if (!this.getClass().equals(other.getClass())) {
            return false;
        }
        return this.equals((IndexReport) other);
    }

    @Override
    public int hashCode() {
        return Objects.hash(
                this.nErrors, this.nIgnored, this.nIndexed,
                this.timeStarted, this.timeFinished);
    }
}
